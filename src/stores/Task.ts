import { stateTask, taskObjectDB, taskDB } from "../types";
import { string } from "mobx-state-tree/dist/types/primitives";
import { action, observable } from "mobx";
import {ItemsCosmetic} from "./ItemsCosmetic";

export class Task {
  @observable taskState: taskDB | undefined = undefined;

  @action getState(): taskDB {
    return {
      ...this.taskState!,
    };
  }

  @action setState(props: taskDB): void {
    this.taskState = {
      ...props,
    };
  }

  @action addTask(props: taskObjectDB): void {
    const newState = { ...this.taskState! };
    newState.task.push({ ...props });
    this.setState(newState);
  }

  @action removeTask(key: string): void {
    const newTask = { ...this.taskState! }.task.filter(
      (item) => item.name !== key
    );
    this.setState({
      task: { ...newTask },
      date: this.taskState!.date,
    });
  }

  @action upload(){
    console.log(ItemsCosmetic);
  }
}
