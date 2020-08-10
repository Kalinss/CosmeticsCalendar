import React, { SyntheticEvent } from "react";
import { Modal, Button } from "semantic-ui-react";

type Alert = {
  title: string;
  description: string;
  buttonName: string;
  isOpen?: boolean;
  clickHandler?: VoidFunction;
};

export const Alert: React.FC<Alert> = ({
  title,
  description,
  buttonName,
  isOpen = false,
  clickHandler = () => {},
}) => {
  return (
    <Modal size={"mini"} open={isOpen}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{description}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={clickHandler}>
          {buttonName}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
