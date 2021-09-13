import React, { useMemo } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import CreateLanguageForm from "../../components/CreateLanguageForm";
import { useGetLangueageById, useUpdateLanguage } from "../../hooks";
import { toast } from "react-toastify";

export default function UpdateLanguage() {
  const history = useHistory();
  const { id } = useParams();

  const { data: languageData } = useGetLangueageById(id);

  const language = useMemo(() => {
    if (languageData && languageData.data) return languageData.data;
  }, [languageData]);

  const { mutate: updateLanguageMutate } = useUpdateLanguage();
  const onUpdateLanguage = (data) => {
    updateLanguageMutate(
      { data, id },
      {
        onSuccess: () => {
          toast.success("Language Update Successfully", {
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
            <h4>Update Language</h4>
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
          <CreateLanguageForm
            createLanguage={onUpdateLanguage}
            initialValues={language}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
