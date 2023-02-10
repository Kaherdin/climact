export default function MissionHow({ how }) {
  // debugger;
  const { icon, title, text } = how;

  return (
    <div className="col-lg-6 mb-3">
      <div className="d-flex">
        <i className={`${icon} text-primary-400 h3`}></i>

        <div className="description ps-4">
          <h5>{title}</h5>
          <p className="text-muted">{text}</p>
        </div>
      </div>
    </div>
  );
}
