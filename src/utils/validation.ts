import {CosmeticItemsModelDB} from './database/cosmeticItemsModelDB';
export const getErrorValidation = (code:number) => {
    switch (code) {
        case 0:
            return "Все в порядке";
        case 1:
            return "Это поле должно быть заполнено";
        case 2:
            return "Это название уже использовалось";
        default:
            return "Неверный код ошибки";
    }
};

export const isNotEmpty = (x: string) => (!!x ? 0 : 1);
export const alreadyIdExistsInDB =(id:string)=>{
    return CosmeticItemsModelDB.get(id)
}