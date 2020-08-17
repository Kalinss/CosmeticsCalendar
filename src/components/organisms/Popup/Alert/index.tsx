import React, { SyntheticEvent } from "react";
import { Modal, Button } from "semantic-ui-react";
import style from '../style.scss'
type Alert = {
  title: string;
  description: string | React.ReactNode;
  buttonName: string;
  isOpen?: boolean;
  clickHandler?: VoidFunction;
  children?:React.ReactNode
};

export const Alert: React.FC<Alert> = ({
  title,
  description,
  buttonName,
  isOpen = false,
  clickHandler = () => {},
  children
}) => {
  return (
    <Modal size={"mini"} open={isOpen}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{description}</Modal.Description>
        <div className={style.addedContent}>
            <Modal.Description>{children}</Modal.Description>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={clickHandler}>
          {buttonName}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
