import React, { SyntheticEvent } from "react";
import { Modal, Button } from "semantic-ui-react";

type Confirm = {
  title: string;
  description: string;
  isOpen?: boolean;
  clickHandler?: (e: SyntheticEvent<HTMLButtonElement, Event>) => void;
};
export const Confirm: React.FC<Confirm> = ({
  title,
  description,
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
        <Button onClick={clickHandler} data-type={0}>
          Нет
        </Button>
        <Button color="black" data-type={1} onClick={clickHandler}>
          Да
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
