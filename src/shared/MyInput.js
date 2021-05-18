import { FormGroup, Label, Input, Col } from "reactstrap";

const MyInput = ({ register, errors, labelName, inputValue, setReadOnly=false, setRequired=false }) => {
  let lowerLabel = labelName.toLowerCase()
  return (
    <FormGroup row style={{ marginBottom: '10px' }}>
      <Label for={lowerLabel} sm={4}>{labelName}</Label>
      <Col sm={8}>
        <Input
          value={inputValue}
          readOnly={setReadOnly}
          {...register(lowerLabel, setRequired ? { required: 'This is required' } : null)}
        />
        {errors[lowerLabel] && <p style={{ color: '#bf1650' }}>{errors[lowerLabel].message}</p>}
      </Col>
    </FormGroup>
  );
}

export default MyInput;