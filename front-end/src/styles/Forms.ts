import styled from "styled-components";

export const FormContainer = styled.div`
    max-width: 400px;
    margin: 50px auto;
`;

export const FormGroup = styled.div`
	margin-bottom: 1rem
`;

export const Label = styled.label`
    display: inline-block;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    height: 1.5rem;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export const Select = styled.select`
    display: block;
    width: 100%;
    height: 2.5rem;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export const ErrorMessage = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
    display: block;
`;

export const ButtonSubmit = styled.div`
    display: inline-block;
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    background-color: #28a745;
    border-color: #28a745;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export const AlertInfo = styled.div`
    max-width: 500px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    align: center;
`


export default {};
