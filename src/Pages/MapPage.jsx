import Map from "../components/Map.jsx";
import Wrapper from "../UI/Wrapper.jsx";
export default function MapPage() {
  return (
    <Wrapper className="w-full h-[80vh] max-md:h-[50vh]">
      <Map />
    </Wrapper>
  );
}
