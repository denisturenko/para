import { Sky, PointerLockControls } from "@react-three/drei";
import { Ground } from "./components/Ground";

export const App = () => {
  return (
    <>
      {/*<fog attach="fog" args={[0xcccccc, 10, 2000]} />*/}
      <PointerLockControls />
      <Sky sunPosition={[0, 1000, 0]} />
      <ambientLight intensity={20} />
      <Ground />
    </>
  );
};

export default App;
