import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CreateCardSetForm from "../../components/CreateCardSetForm";
import { toast } from "react-toastify";
import { useCreateFlashCardSets } from "../../hooks";

export default function CreateCardSet() {
  const history = useHistory();
  const { mutate: createFlashCardSetMutate } = useCreateFlashCardSets();
  const onCreateFlashCardSet = (data) => {
    createFlashCardSetMutate(data, {
      onSuccess: () => {
        toast.success("Card Set Add Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    });
  };

  return (
    <div>
      <Card className="page-content">
        <Card.Header>
          <div className="page-header">
            <h4>Add New CardSet</h4>
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
          <CreateCardSetForm createCardSet={onCreateFlashCardSet} />
        </Card.Body>
      </Card>
    </div>
  );
}
