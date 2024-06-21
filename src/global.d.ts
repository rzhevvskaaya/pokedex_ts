declare module '*.module.scss' { // данная декларация модулей нужна для импорта css в ts как объекта
    // и для работы с селекторами как с со свойствами объекта
    // а также для изоляции стилей в каждом модуле во избежание конфликта имен селекторов
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" { // данные декларации нужна для работы с svg как с реакт компонентом (с подсказываниям по пропсам и т.д.)
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "*.png"; // данные декларации нужны для валидного импорта картинок в компоненты
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

declare const __PLATFORM__: "desktop" | "mobile" // также мы декларируем переменные которые приходят извне для успешного их применения в коде
