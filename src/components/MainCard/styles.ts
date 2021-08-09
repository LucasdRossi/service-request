import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  width: 30%;

  transition: height 0.4s;

  height: ${(props: { tall: boolean }) => (props.tall ? "600px" : "300px")};
`;

export const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
`;

export const Label = styled.label`
  font-size: 1.3rem;
  color: #4b4b4b;
`;

export const SubTitle = styled.p`
  font-size: 1.8rem;
  color: #4b4b4b;
`;

export const Input = styled.input`
  font-size: 1.6rem;
  margin-top: 5px;
  // 100% - ((padding-left + padding-right) + (border * 2))
  width: calc(100% - 23px);
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1.5px solid #767676;
  padding: 10px;

  transition: all 0.2s;

  &:focus-visible {
    outline: none;
    border: 1.5px solid #4ab858;
  }
  &:hover {
    border: 1.5px solid #4ab858;
  }

  &:disabled {
    border: 1.5px solid #767676;
    background-color: lightgray;
  }
`;

export const Button = styled.button`
  font-size: 1.6rem;
  background: #4ab858;
  height: 50px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffffff;
  border: none;

  transition: background 0.2s;

  &:hover {
    background: #30963d;
    cursor: pointer;
  }
  &:disabled {
    cursor: default;
    background: lightgray;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled.p`
  color: #4ab858;
  margin-left: 5px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const DangerButton = styled(Button)`
  background: #ce5353;

  &:hover {
    background: #b53e3e;
    cursor: pointer;
  }
`;
