import React, { useMemo } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import CreateCardSetForm from "../../components/CreateCardSetForm";
import { useGetFlashCardSetsById, useUpdateFlashCardSets } from "../../hooks";
import { toast } from "react-toastify";

export default function UpdateFlashCardSet() {
  const history = useHistory();
  const { id } = useParams();

  const { data: flashCardSetData } = useGetFlashCardSetsById(id);

  const flashCardSet = useMemo(() => {
    if (flashCardSetData && flashCardSetData.data) return flashCardSetData.data;
  }, [flashCardSetData]);

  const { mutate: updateFlashCardSetMutate } = useUpdateFlashCardSets();
  const onUpdateCardSet = (data) => {
    updateFlashCardSetMutate(
      { data, id },
      {
        onSuccess: () => {
          toast.success("Card Set Update Successfully", {
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
            <h4>Manage Card Set</h4>
            <div className="links">
              <Button
                type="primary"
                size="sm"
                onClick={() => history.push("/cardsets")}
              >
                View
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <CreateCardSetForm
            createCardSet={onUpdateCardSet}
            initialValues={flashCardSet}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
