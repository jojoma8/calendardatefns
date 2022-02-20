import React from "react";

function FooterLinks({ name, href }) {
  return (
    <a className="bodyText pb-4 cursor-pointer" href={`${href}`}>
      {name}
    </a>
  );
}

export default FooterLinks;
