import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateFlashCardForm({
  createFlashCard,
  lovFlashCardSets,
  lovLocale,
  Step,
  initialValues,
  addTranslation,
  setStep,
  uploadImageMutate,
}) {
  const history = useHistory();
  const { control, handleSubmit, watch, reset, setValue } = useForm();

  useEffect(() => {
    if (initialValues) {
      setValue("cardset", { value: "", label: "Country-Currency" });
      setValue("language", { value: "", label: "English-United States" });
      setValue("challengeType", {
        value: initialValues.challengeType,
        label: initialValues.challengeType,
      });
      setValue("challengeText", initialValues.challengeText);
      setValue("answerType", {
        value: initialValues.answerType,
        label: initialValues.answerType,
      });
      setValue("answerText", initialValues.answerText);
      setValue("tagString", initialValues.tagString);
    }
  }, [initialValues, setValue]);

  const onSubmit1 = (data) => {
    const newData = [
      {
        cardGroupRef: {
          id: data?.cardset?.value,
        },
        dynAttribute1: null,
        challengeType: data?.challengeType?.value,
        challengeText:
          data?.challengeType?.value === "TEXT" ? data.challengeText : null,
        challengeImageFileLoc:
          data?.challengeType?.value === "PICTURE"
            ? data.challengeImageFileLoc
            : null,
        answerType: data?.answerType?.value,
        answerText: data?.answerType?.value === "TEXT" ? data.answerText : null,
        answerImageFileLoc:
          data?.challengeType?.value === "PICTURE"
            ? data.answerImageFileLoc
            : null,
        tagString: data?.tagString,
      },
    ];
    createFlashCard(newData);
    reset();
  };
  const onSubmit2 = (data) => {
    const newData = [
      {
        localeCode: data.localeCode?.value,
        challengeText:
          data?.challengeType?.value === "TEXT" ? data.challengeText : null,
        answerText: data?.answerType?.value === "TEXT" ? data.answerText : null,
        challengeImageFileLoc:
          data?.challengeType?.value === "PICTURE"
            ? data.challengeImageFileLoc
            : null,
        answerImageFileLoc:
          data?.challengeType?.value === "PICTURE"
            ? data.answerImageFileLoc
            : null,
      },
    ];
    addTranslation(newData);
    reset({
      localeCode: { value: "", lable: "" },
      challengeType: { value: "", lable: "" },
      answerType: { value: "", lable: "" },
    });
  };

  const watchAllFields = watch();

  const onUploadFile = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      uploadImageMutate(formData, {
        onSuccess: (data) => {
          if (e.target.name === "challengeFile")
            setValue("challengeImageFileLoc", data?.data[0]?.fileName);
          if (e.target.name === "answerFile")
            setValue("answerImageFileLoc", data?.data[0]?.fileName);

          toast.success("File Upload Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
      });
    }
  };

  return (
    <>
      {Step === 1 && (
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Card Set
            </Form.Label>
            <Col sm="6">
              <Controller
                name="cardset"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={lovFlashCardSets?.map((i) => ({
                      value: i.id,
                      label: i.title,
                    }))}
                  />
                )}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Languages
            </Form.Label>
            <Col sm="6">
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select
                    options={[
                      {
                        value: "en-US",
                        label: "English-United States",
                      },
                    ]}
                    {...field}
                  />
                )}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Question Type
            </Form.Label>
            <Col sm="6">
              <Controller
                name="challengeType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "TEXT", label: "Text" },
                      { value: "PICTURE", label: "Picture" },
                    ]}
                  />
                )}
              />
            </Col>
          </Form.Group>
          {watchAllFields?.challengeType?.value === "PICTURE" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Question File
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="challengeFile"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="file"
                      {...field}
                      onChange={onUploadFile}
                    />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          {watchAllFields?.challengeType?.value === "TEXT" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Question
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="challengeText"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control as="textarea" rows={3} {...field} />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Answer Type
            </Form.Label>
            <Col sm="6">
              <Controller
                name="answerType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "TEXT", label: "Text" },
                      { value: "PICTURE", label: "Picture" },
                    ]}
                  />
                )}
              />
            </Col>
          </Form.Group>
          {watchAllFields?.answerType?.value === "PICTURE" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Answer File
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="answerFile"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="file"
                      {...field}
                      onChange={onUploadFile}
                    />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          {watchAllFields?.answerType?.value === "TEXT" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Answer
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="answerText"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control as="textarea" rows={3} {...field} />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Category Tag
            </Form.Label>
            <Col sm="6">
              <Controller
                name="tagString"
                control={control}
                defaultValue=""
                render={({ field }) => <Form.Control {...field} />}
              />
            </Col>
          </Form.Group>
          <Row>
            <Col sm="8" className="text-center">
              <Button variant="default" onClick={() => history.push("/cards")}>
                Cancel
              </Button>{" "}
              <Button variant="primary" onClick={handleSubmit(onSubmit1)}>
                Save
              </Button>{" "}
              {initialValues && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    reset();
                    setStep(2);
                  }}
                >
                  Add Transaltion
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      )}
      {Step === 2 && (
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Languages
            </Form.Label>
            <Col sm="6">
              <Controller
                name="localeCode"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={lovLocale?.map((i) => ({
                      value: i.locale,
                      label: i.name,
                    }))}
                  />
                )}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Question Type
            </Form.Label>
            <Col sm="6">
              <Controller
                name="challengeType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "TEXT", label: "Text" },
                      { value: "PICTURE", label: "PICTURE" },
                    ]}
                  />
                )}
              />
            </Col>
          </Form.Group>
          {watchAllFields?.challengeType?.value === "PICTURE" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Question File
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="challengeFile"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="file"
                      {...field}
                      onChange={onUploadFile}
                    />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          {watchAllFields?.challengeType?.value === "TEXT" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Question
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="challengeText"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control as="textarea" rows={3} {...field} />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Answer Type
            </Form.Label>
            <Col sm="6">
              <Controller
                name="answerType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "TEXT", label: "Text" },
                      { value: "PICTURE", label: "Picture" },
                    ]}
                  />
                )}
              />
            </Col>
          </Form.Group>
          {watchAllFields?.answerType?.value === "PICTURE" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Answer File
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="answerFile"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="file"
                      {...field}
                      onChange={onUploadFile}
                    />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          {watchAllFields?.answerType?.value === "TEXT" && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Answer
              </Form.Label>
              <Col sm="6">
                <Controller
                  name="answerText"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control as="textarea" rows={3} {...field} />
                  )}
                />
              </Col>
            </Form.Group>
          )}
          <Row>
            <Col sm="8" className="text-center">
              <Button
                variant="secondary"
                onClick={() => history.push("/cards")}
              >
                Cancel
              </Button>{" "}
              <Button variant="primary" onClick={handleSubmit(onSubmit2)}>
                Add Translation
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
