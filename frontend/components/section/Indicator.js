export default function Indicator({ indic, className = "p-2 m-3" }) {
  // debugger;
  const { number, text, icon, link } = indic;

  return (
    <div className={className}>
      <a href={link}>
        <div className="text-center">
          <div className="">
            <h3 className="h3">
              {icon && <i className={`${icon} text-primary-400 h1`}></i>}
              <strong>{number}</strong>
            </h3>
          </div>
          <h6 className="info-title text-capitalize text-primary-400 m-0">
            {text}
          </h6>
        </div>
      </a>
    </div>
  );
}
