import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CreateLanguageForm from "../../components/CreateLanguageForm";
import { useCreateLanguage } from "../../hooks";
import { toast } from "react-toastify";

export default function CreateLanguage() {
  const history = useHistory();

  const { mutate: createLanguageMutate } = useCreateLanguage();
  const onCreateLanguage = (data) => {
    createLanguageMutate(data, {
      onSuccess: () => {
        toast.success("Language Add Successfully", {
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
            <h4>Add New Language</h4>
            <div className="links">
              <Button
                type="primary"
                size="sm"
                onClick={() => history.push("/language")}
              >
                View
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <CreateLanguageForm createLanguage={onCreateLanguage} />
        </Card.Body>
      </Card>
    </div>
  );
}
