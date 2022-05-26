import styled from "styled-components";

export const Container = styled.div`
    max-width: 600px;
    width: 100%;
    margin: auto;
`;

export const ButtonPrimary = styled.div`
    display: inline-block;
    font-weight: 400;
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 0.875rem;
    line-height: 1;
    border-radius: .25rem;
    margin: 5px auto;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export const ButtonDanger = styled.div`
    display: inline-block;
    font-weight: 400;
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 0.875rem;
    line-height: 1;
    border-radius: .25rem;
    margin: 5px auto;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export const Table = styled.table`
    display: table;
    width: 100%;
    max-width: 800px;
    margin-bottom: 1rem;
    color: #212529;
    border-collapse: collapse;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: gray;
`;

export const Tr = styled.tr`
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
`;

export const Td = styled.td`
    display: table-cell;
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
`;

export const Th = styled.th`
`;

export default {};