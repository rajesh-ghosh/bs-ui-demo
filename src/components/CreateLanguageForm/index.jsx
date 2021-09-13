import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function CreateLanguageForm({ createLanguage, initialValues }) {
  const history = useHistory();
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (initialValues) {
      setValue("name", initialValues.name);
      setValue("isoCharSet", initialValues.isoCharSet);
      setValue("locale", initialValues.locale);
      setValue("enabled", initialValues.enabled);
    }
  }, [initialValues, setValue]);

  const onSubmit = (data) => createLanguage(initialValues ? data : [data]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Locale
        </Form.Label>
        <Col sm="6">
          <Controller
            name="locale"
            control={control}
            render={({ field }) => <Form.Control {...field} />}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Character Set
        </Form.Label>
        <Col sm="6">
          <Controller
            name="isoCharSet"
            control={control}
            render={({ field }) => <Form.Control {...field} />}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="6">
          <Controller
            name="name"
            control={control}
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
          <Button variant="secondary" onClick={() => history.push("/language")}>
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
