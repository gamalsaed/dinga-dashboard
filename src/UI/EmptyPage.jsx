import { Link } from "react-router-dom";
import addIcon from "../assets/icons/add.svg";
import Wrapper from "./Wrapper";
export default function EmptyPage({
  children,
  path,
  btnContent,
  buttonIsHidden,
}) {
  return (
    <Wrapper className="h-[100vh]">
      <h1 className="text-3xl font-bold text-center mb-5">{children}</h1>
      <div className="flex justify-center items-center">
        {" "}
        {!buttonIsHidden && (
          <Link to={path}>
            <button className="px-[12px] py-[8px] text-white cursor-pointer bg-[#1A71F6] rounded-2xl flex items-center gap-2 justify-center">
              <span>{btnContent}</span>
              <img src={addIcon} className="w-[30px] h-[30px]" alt="" />
            </button>
          </Link>
        )}
      </div>
    </Wrapper>
  );
}
