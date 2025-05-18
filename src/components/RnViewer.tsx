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

    let g_forwardRenderPipeline: Rn.ForwardRenderPipeline;
    let g_cameraEntity: Rn.ICameraControllerEntity;

    (async ()=> {
      const iblDirectoryPath = 'https://storage.googleapis.com/emadurandal-3d.appspot.com/rhodonite/assets/ibl/papermill'
      Rn.Config.cgApiDebugConsoleOutput = true;
      const canvas = document.getElementById('world') as HTMLCanvasElement;
      await Rn.System.init({
        approach: Rn.ProcessApproach.DataTexture,
        canvas,
      });
      console.log('Rn.System.init');

      // create ForwardRenderPipeline
      g_forwardRenderPipeline = new Rn.ForwardRenderPipeline();
      g_forwardRenderPipeline.setup(canvas.width, canvas.height, {
        isBloom: true,
        isShadow: false,
      });

      // camera
      // const { cameraComponent, cameraEntity } = createCamera();
      // g_cameraEntity = cameraEntity;

      // gltf
      const mainExpression = (
        await Rn.GltfImporter.importFromUri(gltfFilePath, {
          // cameraComponent: cameraComponent,
          defaultMaterialHelperArgumentArray: [
            {
              makeOutputSrgb: false,
            },
          ],
        })
      ).unwrapForce();

      // env
      const envExpression = createEnvCubeExpression(iblDirectoryPath);

      const mainRenderPass = mainExpression.renderPasses[0];
      mainRenderPass.tryToSetUniqueName('main', true);
      // cameraController
      // const mainCameraControllerComponent = cameraEntity.getCameraController();
      // const controller = mainCameraControllerComponent.controller as Rn.OrbitCameraController;
      // controller.setTarget(mainRenderPass.sceneTopLevelGraphComponents[0].entity);
      // controller.dolly = 0.83;


      await g_forwardRenderPipeline.setExpressions([envExpression, mainExpression]);

      // lighting
      const diffuseCubeTexture = new Rn.CubeTexture();
      diffuseCubeTexture.baseUriToLoad = iblDirectoryPath + '/diffuse/diffuse';
      diffuseCubeTexture.isNamePosNeg = true;
      diffuseCubeTexture.hdriFormat = Rn.HdriFormat.RGBE_PNG;
      diffuseCubeTexture.mipmapLevelNumber = 1;

      const specularCubeTexture = new Rn.CubeTexture();
      specularCubeTexture.baseUriToLoad = iblDirectoryPath + '/specular/specular';
      specularCubeTexture.isNamePosNeg = true;
      specularCubeTexture.hdriFormat = Rn.HdriFormat.RGBE_PNG;
      specularCubeTexture.mipmapLevelNumber = 10;

      await g_forwardRenderPipeline.setIBLTextures(diffuseCubeTexture, specularCubeTexture);

      let count = 0;
      let startTime = Date.now();
      const draw = function (frame: Rn.Frame) {
        const cameraComponent = Rn.ComponentRepository.getComponentsWithType(Rn.CameraComponent).at(3)!.componentSID;
        Rn.CameraComponent.current = cameraComponent;
        if (isAnimating) {
          Rn.AnimationComponent.setIsAnimating(true);
          const date = new Date();
          const time = (date.getTime() - startTime) / 1000;
          Rn.AnimationComponent.globalTime = time;
          if (time > Rn.AnimationComponent.endInputValue) {
            startTime = date.getTime();
          }
        } else {
          Rn.AnimationComponent.setIsAnimating(false);
        }

        Rn.System.process(frame);

        count++;
      };

      g_forwardRenderPipeline.startRenderLoop(draw);

      function createCamera() {
        const cameraEntity = Rn.createCameraControllerEntity();
        const cameraComponent = cameraEntity.getCamera();
        cameraComponent.zNear = 0.1;
        cameraComponent.zFar = 1000.0;
        cameraComponent.setFovyAndChangeFocalLength(30.0);
        cameraComponent.aspect = 1.0;
        return { cameraComponent, cameraEntity };
      }

      function createEnvCubeExpression(baseuri) {
        const environmentCubeTexture = new Rn.CubeTexture();
        environmentCubeTexture.baseUriToLoad = baseuri + '/environment/environment';
        environmentCubeTexture.isNamePosNeg = true;
        environmentCubeTexture.hdriFormat = Rn.HdriFormat.LDR_SRGB;
        environmentCubeTexture.mipmapLevelNumber = 1;
        environmentCubeTexture.loadTextureImagesAsync();

        const sphereMaterial = Rn.MaterialHelper.createEnvConstantMaterial();
        const sampler = new Rn.Sampler({
          wrapS: Rn.TextureParameter.ClampToEdge,
          wrapT: Rn.TextureParameter.ClampToEdge,
          minFilter: Rn.TextureParameter.Linear,
          magFilter: Rn.TextureParameter.Linear,
        });
        sphereMaterial.setTextureParameter('colorEnvTexture', environmentCubeTexture, sampler);
        sphereMaterial.setParameter('envHdriFormat', Rn.HdriFormat.LDR_SRGB.index);

        const spherePrimitive = new Rn.Sphere();
        spherePrimitive.generate({
          radius: 20,
          widthSegments: 40,
          heightSegments: 40,
          material: sphereMaterial,
        });

        const sphereMesh = new Rn.Mesh();
        sphereMesh.addPrimitive(spherePrimitive);

        const sphereEntity = Rn.createMeshEntity();
        sphereEntity.getTransform().localScale = Rn.Vector3.fromCopyArray([-1, 1, 1]);
        sphereEntity.getTransform().localPosition = Rn.Vector3.fromCopyArray([0, 0, 0]);

        const sphereMeshComponent = sphereEntity.getMesh();
        sphereMeshComponent.setMesh(sphereMesh);

        const sphereRenderPass = new Rn.RenderPass();
        sphereRenderPass.tryToSetUniqueName('envCube', true);
        sphereRenderPass.addEntities([sphereEntity]);
        // sphereRenderPass.cameraComponent = cameraEntity.getCamera();

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
