import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Slider from "react-slick";
import { TestResultData } from "..";
import { useNavigate } from "react-router-dom";

export default function Character({ slide }: props) {
  const home = useSelector((state: RootState) => state.home);
  const [o, setO] = useState(0);
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState("block");

  const settings = {
    dots: false,
    adaptiveHeight: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    rows: slide,
    slidesPerRow: slide,
    arrows: true,
  };

  useEffect(() => {
    if (home.page === 1) {
      window.addEventListener("click", () => {
        setDisplay("none");
      });
      setO(1);
      setOpacity(1);
      setTimeout(() => {
        setOpacity(0);
      }, 1500);
      setTimeout(() => {
        setDisplay("none");
      }, 3000);
    }
  }, [home.page]);

  return (
    <CharacterContainer>
      <CharacterOverlay opacity={opacity} display={display}>
        <CharacterOverlayText>당신의 성향에 맞는 캐릭터를 찾아보세요!</CharacterOverlayText>
      </CharacterOverlay>
      <CharacterBox>
        {TestResultData.map((item) => (
          <CharacterCard
            src={item.img}
            key={item.id}
            delay={0.1 * Number(item.id)}
            opacity={o}
            onClick={() => navigate(`/test/result/${item.id}`)}
          />
        ))}
      </CharacterBox>
      {/* max-width: 1200px */}
      <CharacterSlider {...settings}>
        {TestResultData.map((item) => (
          <SliderCard src={item.img} key={item.id} onClick={() => navigate(`/test/result/${item.id}`)} />
        ))}
      </CharacterSlider>
    </CharacterContainer>
  );
}

interface props {
  slide: number;
}

interface card {
  delay: number;
  opacity: number;
}

interface overlay {
  opacity: number;
  display: string;
}

const CharacterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    height: 70vh;
  }
`;

const CharacterOverlay = styled.div<overlay>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: ${(overlay) => overlay.opacity};
  display: ${(overlay) => overlay.display};
  transition-duration: 1.5s;
`;

const CharacterOverlayText = styled.h1`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 40%;
  font-size: 40px;
  color: #f5c443;
  @media screen and (max-width: 1200px) {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 35px;
  }
  @media screen and (max-width: 480px) {
    font-size: 25px;
  }
`;

const CharacterBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vh;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const CharacterCard = styled.img<card>`
  width: 15%;
  height: 40%;
  background: #050e39;
  margin: 0 10px 0 10px;
  object-fit: cover;
  opacity: ${(props) => props.opacity};
  transition-delay: ${(props) => props.delay}s;
  transition-duration: 1s;
  cursor: pointer;
`;

const CharacterSlider = styled(Slider)`
  width: 100vw;
  height: auto;
  display: inline-block;
  display: none;
  background-color: rgb(8, 14, 47);
  .slick-arrow {
    width: 50px;
    height: 50px;
    z-index: 10;
  }
  .slick-prev {
    left: 15px;
    &::before {
      font-family: "yg-jalnan";
      font-size: 50px;
      content: "<";
      color: #f5c443;
    }
  }
  .slick-next {
    right: 15px;
    &::before {
      font-family: "yg-jalnan";
      font-size: 50px;
      content: ">";
      color: #f5c443;
    }
  }
  .slick-slide {
    width: 100%;
    height: auto;
    div {
      width: 60vw;
      height: auto;
      margin: auto;
    }
    div img {
      object-fit: cover;
      padding: 5px;
    }
  }
  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

const SliderCard = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    width: 110%;
  }
`;
