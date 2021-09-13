import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import CreateFlashCardForm from "../../components/CreateFlashCardForm";
import {
  useAddTranslation,
  useCreateFlashCards,
  useGetLovFlashCardSets,
  useGetLovLanguages,
  useUploadImage,
} from "../../hooks";
import { toast } from "react-toastify";

export default function CreateFlashCard() {
  const history = useHistory();
  const [Step, setStep] = useState(1);
  const [prevData, setPrevData] = useState(null);
  const { data: lovFlashCardSetsData } = useGetLovFlashCardSets();
  const { data: lovLocaleData } = useGetLovLanguages();

  const lovFlashCardSets = useMemo(() => {
    if (lovFlashCardSetsData && lovFlashCardSetsData.data) {
      return lovFlashCardSetsData.data;
    }
  }, [lovFlashCardSetsData]);

  const lovLocale = useMemo(() => {
    if (lovLocaleData && lovLocaleData.data) {
      return lovLocaleData.data;
    }
  }, [lovLocaleData]);
  const { mutate: uploadImageMutate } = useUploadImage();

  const { mutate: createFlashCardMutate } = useCreateFlashCards(); 
  const onCreateFlashCard = (data) => {
    createFlashCardMutate(data, {
      onSuccess: (data) => {
        setPrevData(data);
        setStep(2);
        toast.success("Card Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    });
    //console.log(data.data[0].id);
    //console.log(prevData);
    //history.push('/cards/update/' + data.data[0].id);
  };

  const { mutate: addTranslationMutate } = useAddTranslation();
  const addTranslation = (data) => {
    addTranslationMutate(
      { data, id: prevData.data[0].id },
      {
        onSuccess: () => {
          toast.success("Translation Added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
      }
    );
  };

  return (
    <div>
      <Card className="page-content">
        <Card.Header>
          <div className="page-header">
            <h4>Flash Card Create</h4>
            <div className="links">
              <Button
                type="primary"
                size="sm"
                onClick={() => history.push("/cards")}
              >
                View
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <CreateFlashCardForm
            createFlashCard={onCreateFlashCard}
            lovFlashCardSets={lovFlashCardSets}
            lovLocale={lovLocale}
            Step={Step}
            addTranslation={addTranslation}
            useUploadImage={useUploadImage}
            uploadImageMutate={uploadImageMutate}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
