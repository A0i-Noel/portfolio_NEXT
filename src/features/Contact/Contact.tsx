import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import "./contact.scss";
import EmailForm from "./EmailForm";

const Contact = () => {

  const socialMedias = [
    {
      link : "https://www.linkedin.com/in/aoi-kuriki-6aa160233/",
      icon: FaLinkedin,
    },
    {
      link : "https://github.com/A0i-Noel",
      icon: FaGithubSquare,
    },
    {
      link : "https://www.instagram.com/noel_glue/",
      icon : FaInstagramSquare,
    }
  ]

  return (
    <div className="l-page__section">
      <h4>Contact Me</h4>
      {/* Social Medias */}
      <div className="p-contact__icons">
        {
          socialMedias.map((media, i) => {
          const Icon = media.icon; 
          return (
            <a
              key={i}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-contact__icon"
            >
              <Icon size={40} color="#FFF"/>
            </a>
          );
        })
        }
      </div>
      {/* Email Form */}
      <EmailForm />
    </div>
  );
}

export default Contact;