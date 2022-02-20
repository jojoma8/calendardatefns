import React from "react";

function FooterLinks({ name }) {
  return (
    <a className="bodyText pb-4 cursor-pointer" href={`#${name}`}>
      {name}
    </a>
  );
}

export default FooterLinks;
