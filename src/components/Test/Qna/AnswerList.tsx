import styled from "styled-components";
import { AnswerData } from "../..";
import { RootState, incrementProgress, decrementProgress, onChangeAnsIdx, delLastAnsIdx, testResultCalc } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function AnswerList({ progress }: props) {
  const data = AnswerData.answers[progress];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testResultIdx = useSelector((state: RootState) => state.progress.testResultIdx);

  const next = (idx: any) => {
    if (progress < 9) {
      dispatch(incrementProgress(1));
      dispatch(onChangeAnsIdx(idx));
    } else {
      dispatch(testResultCalc());
      navigate(`/test/result/${testResultIdx}`);
    }
  };
  const prev = () => {
    if (progress > 0) {
      dispatch(decrementProgress(1));
      dispatch(delLastAnsIdx());
    }
  };

  return (
    <>
      <AnsWrap>
        {data.answer.map((ans, idx) => (
          <AnsNextDiv
            onClick={() => {
              next(idx);
            }}
            key={idx}
          >
            {ans}
          </AnsNextDiv>
        ))}
        {progress > 0 && (
          <AnsPrevDiv onClick={prev}>
            뒤로 가기<RiArrowGoBackLine className="prev_btn"></RiArrowGoBackLine>
          </AnsPrevDiv>
        )}
      </AnsWrap>
    </>
  );
}

interface props {
  progress: number;
}

const AnsWrap = styled.div`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  position: fixed;
  width: fit-content;
  min-width: 400px;
  bottom: 15%;
  left: 50%;
  margin: auto;
  @media screen and (max-width: 480px) {
    position: relative;
    margin-top: 30px;
  }
`;
const AnsNextDiv = styled.div`
  padding: 15px 30px;
  margin-top: 5px;
  transform: translate(-50%, 0);
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: white;
    color: rgba(1, 5, 27, 1);
  }
`;
const AnsPrevDiv = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1.15rem;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: darkgray;
  }
`;
