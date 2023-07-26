import styled from "styled-components";
import { Link } from "react-router-dom";
const PageHero = ({ title }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home </Link>
          <span>/ {title}</span>
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-8);
  width: 100%;
  min-height: 15vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-4);
  a {
    color: var(--clr-primary-11);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-4);
  }
  span {
    color: var(--clr-primary-11)
  }
`;

export default PageHero;
