import React, { useRef } from "react";
import { MainStore } from "../../../stores";
import { Content, Page, TodayWidgetTodoList } from "../../index";
import { TodoListTemplate } from "../TodoListTemplate";
import { Calendar } from "../../organisms/Calendar";
import { clickHandlerType as clickButtonHandler } from "../../organisms/AddTask/type";
import { taskDB } from "types";
import { Checkbox, CheckboxProps } from "semantic-ui-react";
import { Alert } from "../../organisms/Popup/Alert";
import style from "./style.scss";

type typeMainTemplate = {
  stores: MainStore;
  clickAddButtonTodoWidget: clickButtonHandler;
  todoTask: taskDB;
  closeTaskTodoWidget: (day: boolean) => (e: any) => void;
  isOpenAlert?: boolean;
  closeAlert: (isNotShowMore: boolean) => void;
};

export const MainTemplate: React.FC<typeMainTemplate> = ({
  stores,
  clickAddButtonTodoWidget,
  closeTaskTodoWidget,
  todoTask,
  closeAlert,
  isOpenAlert = false,
}) => {
  const notShowMore = useRef(null);
  stores!.Setting.config;
  const isViewField = (
    key: string // checks that store has a field
  ) => {
    const result = stores!.Setting.config.find((item) => item.key === key);
    if (!result) return false;
    return result.value;
  };

  const TodayWidgetWrap = () =>
    isViewField("todoListWidget") ? <TodayWidgetTodoList /> : <></>;

  const CalendarWrap = () =>
    isViewField("calendar") ? <Calendar stores={stores} /> : <></>;

  const fullTodoListWrap = () =>
    isViewField("todoListFull") && (
      <TodoListTemplate
        items={todoTask}
        clickHandler={clickAddButtonTodoWidget}
        clickTaskHandler={closeTaskTodoWidget}
      />
    );
  const UpdateInfo = () => {
    return (
      <div className={style.infoUpdate}>
        <h3>Beta-testing</h3>
        <p>Добро пожаловать на бета-тестирование планнера по уходу за собой.</p>
        <p>
          Данное приложение помогает пользователю организовать порядок
          применения уходовых косметических средств.
        </p>
        <ul>
          В этой версии вы можете воспользоваться:
          <li>
            Удалением/созданием/редактированием продуктов по уходу за кожей
          </li>
          <li>
            Организацией индивидуального порядка пременения уходовых средств
          </li>
          <li>
            Настройки отображения информации на главной странице с помощью
            виджетов.
          </li>
          <li>Добавление индивидуальных задач на день</li>
        </ul>
        <ul>
          Обновления 0.1.5
          <li>Улучшена кодовая база приложения</li>
          <li>Выполнена подготовка к автоматической отправке ошибок</li>
        </ul>
        <ul>
          Внимание!
          <li>
            После проведения бета-тестирования все данные вашей косметической
            базы будут удалены
          </li>
          <li>
            Разработчик не гарантирует сохранение вашей косметической базы с
            каждым обновлением приложения на бета-тесте
          </li>
          <li>
            Приложение не сохраняет на стороне никакую информацию о своих
            пользователях, а так же не передает никакую информацию третьим
            лицам. Вся введённая вами информация хранится в памяти браузера,
            которым вы пользуетесь.
          </li>
          <li>
            В будущем появится возможность автоматического сбора ошибок
            приложения пользователя, а также сбора статистики об использовании
            приложения отдельными пользователями
          </li>
          <li>
            В случае появления монетизации приложения, все пользователи
            бета-тестирования получат перманентный премиум аккаунт со всеми его
            возможностями
          </li>
          <li>
            Все сведения о возникнувших в ходе вашего использования ошибках и
            предложения по улучшению приложения вы можете отправлять на почту:{" "}
            <a href="mailto:kalinss16@gmail.com">kalinss16@gmail.com</a>
          </li>
          <li>
            В случае отправки сообщения об ошибке, пожалуйста, также сообщите
            модель вашего телефона и версию браузера, с которого вы запускали
            приложение
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Page>
      <Content>
        <TodayWidgetWrap />
        <CalendarWrap />
        {fullTodoListWrap()}
        <Alert
          buttonName={"Закрыть"}
          title={`Версия: "${stores.Additional.version}"`}
          description={<UpdateInfo />}
          isOpen={isOpenAlert}
          clickHandler={() => {
            closeAlert((notShowMore!.current! as CheckboxProps).state.checked);
          }}
        >
          <Checkbox ref={notShowMore} label="Больше не показывать" />
        </Alert>
      </Content>
    </Page>
  );
};
