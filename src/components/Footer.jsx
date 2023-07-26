import styled from "styled-components";
const Footer = () => {
  return (
    <Container>
      <h5>
        &copy;{new Date().getFullYear()}
        <span> Morina</span>
      </h5>
      <h5>Всички права запазени.</h5>
    </Container>
  );
};

const Container = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-gray-10);
  text-align: center;
  span {
    color: var(--clr-primary-6);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
