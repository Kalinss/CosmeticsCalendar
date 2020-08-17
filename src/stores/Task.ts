import { taskObjectDB, taskDB } from "../types";
import { action, observable } from "mobx";
import { ItemsCosmetic } from "./ItemsCosmetic";
import { toJS } from "mobx";

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
  @action toogleCloseTask(key: string,day:boolean): void {
    const date = this.taskState!.date!;
    const newStateTask = [...toJS(this.taskState!.task!)];
    const object = newStateTask.find((item) => {
      return item.name === key.trim();
    });
    if(day){
      object!.closed.day = !object!.closed.day;
    }else{
      object!.closed.evening = !object!.closed.evening;
    }
    this.updateTask(key, object!);
  }
  @action updateTask(key: string, object: taskObjectDB): void {
    const newState = { ...this.taskState! }.task;
    const index = newState.findIndex((item) => item.name === key.trim());
    newState.splice(index, 1, object);
    this.setState({
      task: [...newState],
      date: this.taskState!.date,
    });
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
      task: [...newTask],
      date: this.taskState!.date,
    });
  }
}
