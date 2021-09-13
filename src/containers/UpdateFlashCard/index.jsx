import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import CreateFlashCardForm from "../../components/CreateFlashCardForm";
import {
  useAddTranslation,
  useGetFlashCardById,
  useGetLovFlashCardSets,
  useGetLovLanguages,
  useUpdateFlashCards,
  useUploadImage,
} from "../../hooks";
import { toast } from "react-toastify";

export default function UpdateFlashCard() {
  const history = useHistory();
  const { id } = useParams();
  const [Step, setStep] = useState(1);
  const { data: flashCardData } = useGetFlashCardById(id);

  const flashCard = useMemo(() => {
    if (flashCardData && flashCardData.data) return flashCardData.data;
  }, [flashCardData]);

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

  const { mutate: updateFlashCardMutate } = useUpdateFlashCards();
  const onUpdateFlashCard = (data) => {
    updateFlashCardMutate(
      { data, id: flashCard.id },
      {
        onSuccess: () => {
          toast.success("Flash Card Update Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setStep(2);
        },
      }
    );
  };

  const { mutate: addTranslationMutate } = useAddTranslation();
  const addTranslation = (data) => {
    addTranslationMutate(
      { data, id: flashCard.id },
      {
        onSuccess: () => {
          toast.success("Translation Added", {
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
            <h4>Manage Flash Card </h4>
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
            createFlashCard={onUpdateFlashCard}
            initialValues={flashCard}
            lovFlashCardSets={lovFlashCardSets}
            lovLocale={lovLocale}
            Step={Step}
            addTranslation={addTranslation}
            setStep={setStep}
            uploadImageMutate={uploadImageMutate}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
