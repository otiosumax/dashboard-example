import "./NotFoundView.css";

import { Link } from "react-router-dom";

function NotFoundView() {
  return (
    <div className="not-found-view slide-in-up">
      <p className="font-mono text-muted">Ошибка 404</p>
      <h1 className="not-found-code font-mono">404</h1>
      <p className="text-muted not-found-text">
        Такой страницы не существует. Возможно, адрес указан неверно или
        страница была перемещена.
      </p>
      <Link to="/" className="button-active not-found-link">
        Вернуться на панель мониторинга
      </Link>
    </div>
  );
}

export default NotFoundView;
