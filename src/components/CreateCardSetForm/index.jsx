import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function CreateLanguageForm({ createCardSet, initialValues }) {
  const history = useHistory();
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (initialValues) {
      setValue("title", initialValues.title);
      setValue("enabled", initialValues.enabled);
    }
  }, [initialValues, setValue]);

  const onSubmit = (data) => {
    createCardSet(initialValues ? data : [data]);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="6">
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => <Form.Control {...field} />}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Enabled
        </Form.Label>
        <Col sm="6">
          <Controller
            name="enabled"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Check
                type="checkbox"
                defaultChecked={initialValues?.enabled}
                {...field}
              />
            )}
          />
        </Col>
      </Form.Group>
      <Row>
        <Col sm="8" className="text-center">
          <Button variant="secondary" onClick={() => history.push("/cardsets")}>
            Cancel
          </Button>{" "}
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
