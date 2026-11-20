import { useEffect } from "react";
import Rn from "rhodonite/dist/esmdev/index.js";

type RnViewerProps = {
  gltfFilePath: string;
  width: number;
  height: number;
  isAnimating: boolean;
}

export const RnViewer = ({ gltfFilePath, width, height, isAnimating }: RnViewerProps) => {
  useEffect(() => {

    (async ()=> {
      const iblDirectoryPath = 'https://storage.googleapis.com/emadurandal-3d.appspot.com/rhodonite/assets/ibl/papermill'
      const canvas = document.getElementById('world') as HTMLCanvasElement;
      const engine = await Rn.Engine.init({
        approach: Rn.ProcessApproach.WebGL2,
        canvas,
        config: new Rn.Config({ cgApiDebugConsoleOutput: true }),
      });
      console.log('Rn.Engine.init');

      // gltf
      const mainExpression = await Rn.GltfImporter.importFromUrl(engine, gltfFilePath, {
        defaultMaterialHelperArgumentArray: [
          {
            makeOutputSrgb: false,
          },
        ],
      });

      const mainRenderPass = mainExpression.renderPasses[0];
      mainRenderPass.tryToSetUniqueName('main', true);

      // lighting
      const [diffuseCubeTexture, specularCubeTexture] = await Promise.all([
        Rn.CubeTexture.loadFromUrl(engine, {
          baseUrl: iblDirectoryPath + '/diffuse/diffuse',
          isNamePosNeg: true,
          hdriFormat: Rn.HdriFormat.RGBE_PNG,
          mipmapLevelNumber: 1,
        }),
        Rn.CubeTexture.loadFromUrl(engine, {
          baseUrl: iblDirectoryPath + '/specular/specular',
          isNamePosNeg: true,
          hdriFormat: Rn.HdriFormat.RGBE_PNG,
          mipmapLevelNumber: 10,
        }),
      ]);

      // env
      const envExpression = await createEnvCubeExpression(engine, iblDirectoryPath);

      // create ForwardRenderPipeline
      const forwardRenderPipeline = new Rn.ForwardRenderPipeline(engine);
      await forwardRenderPipeline.setup(canvas.width, canvas.height, {
        isBloom: false,
        isShadow: false,
      });

      await forwardRenderPipeline.setExpressions([envExpression, mainExpression]);
      forwardRenderPipeline.setIBLTextures(diffuseCubeTexture, specularCubeTexture);

      let startTime = Date.now();
      const draw = function (frame: Rn.Frame) {
        const cameraComponents = engine.componentRepository.getComponentsWithType(Rn.CameraComponent);
        const cameraComponent = cameraComponents.at(3) ?? cameraComponents[0];
        if (cameraComponent != null) {
          Rn.CameraComponent.setCurrent(engine, cameraComponent.componentSID);
        }
        if (isAnimating) {
          Rn.AnimationComponent.setIsAnimating(engine, true);
          const date = new Date();
          const time = (date.getTime() - startTime) / 1000;
          Rn.AnimationComponent.setGlobalTime(engine, time);
          if (time > Rn.AnimationComponent.getEndInputValue(engine)) {
            startTime = date.getTime();
          }
        } else {
          Rn.AnimationComponent.setIsAnimating(engine, false);
        }

        engine.process(frame);
      };

      forwardRenderPipeline.startRenderLoop(draw);

      async function createEnvCubeExpression(engine: Rn.Engine, baseuri: string) {
        const environmentCubeTexture = await Rn.CubeTexture.loadFromUrl(engine, {
          baseUrl: baseuri + '/environment/environment',
          isNamePosNeg: true,
          hdriFormat: Rn.HdriFormat.LDR_SRGB,
          mipmapLevelNumber: 1,
        });

        const sphereMaterial = Rn.MaterialHelper.createEnvConstantMaterial(engine);
        const sampler = new Rn.Sampler(engine, {
          wrapS: Rn.TextureParameter.ClampToEdge,
          wrapT: Rn.TextureParameter.ClampToEdge,
          minFilter: Rn.TextureParameter.Linear,
          magFilter: Rn.TextureParameter.Linear,
        });
        sphereMaterial.setTextureParameter('colorEnvTexture', environmentCubeTexture, sampler);
        sphereMaterial.setParameter('envHdriFormat', Rn.HdriFormat.LDR_SRGB.index);

        const spherePrimitive = new Rn.Sphere(engine);
        spherePrimitive.generate({
          radius: 20,
          widthSegments: 40,
          heightSegments: 40,
          material: sphereMaterial,
        });

        const sphereMesh = new Rn.Mesh(engine);
        sphereMesh.addPrimitive(spherePrimitive);

        const sphereEntity = Rn.createMeshEntity(engine);
        sphereEntity.getTransform().localScale = Rn.Vector3.fromCopyArray([-1, 1, 1]);
        sphereEntity.getTransform().localPosition = Rn.Vector3.fromCopyArray([0, 0, 0]);

        const sphereMeshComponent = sphereEntity.getMesh();
        sphereMeshComponent.setMesh(sphereMesh);

        const sphereRenderPass = new Rn.RenderPass(engine);
        sphereRenderPass.tryToSetUniqueName('envCube', true);
        sphereRenderPass.addEntities([sphereEntity]);

        const sphereExpression = new Rn.Expression();
        sphereExpression.addRenderPasses([sphereRenderPass]);

        return sphereExpression;
      }
    })();
  }, [gltfFilePath, width, height, isAnimating]);

  return <div>
    <canvas id="world" width={width} height={height}></canvas>
  </div>;
};
