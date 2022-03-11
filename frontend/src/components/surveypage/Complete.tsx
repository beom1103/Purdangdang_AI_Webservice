import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { QuestionBox, Title } from "../../pages/SurveyPage";
import { Plant, User } from "../../store/type";
import { useCallback } from "react";
import PlantCard from "../search/PlantCard";
import { useNavigate } from "react-router-dom";
import Footer from "../global/Footer";
import { addMyPage } from "../../api/myPage";

type CompleteProps = {
  user: User | undefined;
  result: Plant[];
};

const Complete: React.FC<CompleteProps> = ({ user, result }) => {
  const navigate = useNavigate();

  const goDetailPage = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const plantId = target.id;

    if (plantId) {
      navigate(`/plant/${plantId}/info`);
    }
  }, []);

  const addMyList = () => {
    result.map((plant) => addMyPage(false, `${plant.rank}`));
  };

  useEffect(() => {
    addMyList();
  }, [result]);

  return (
    <div className="container">
      <QuestionBox className="animate-fade-in-up">
        <Title>검사를 완료하였습니다.</Title>
        <Title>
          <Green>{user?.username}</Green>님께 추천하는 푸르댕댕이는 다음과
          같습니다.
        </Title>
      </QuestionBox>

      <div className="mb-5 card">
        {result?.map((plant: Plant) => {
          return (
            <PlantCard
              key={`plant-${plant.rank}`}
              kor={plant.kor}
              name={plant.name}
              rank={plant.rank}
              image={plant.image_url}
              onClickFunc={goDetailPage}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Complete);

const Green = tw.span` 
  text-green-500
`;
