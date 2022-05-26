import styled from 'styled-components';
  
export const Button = styled.div`
    width : 100px ;
      cursor: pointer ;
    text-decoration : none;
    color : white ;
    background-color : purple;
    margin : 0 auto ;
    font-size:2rem; 
`;

export const Nav = styled.nav`
    background-color: #343a40!important;
    color: #fff !important;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: .5rem 1rem;
    flex-flow: row nowrap;
    justify-content: flex-start;
    margin: -10px;
    padding: 10px 100px;
`;

export const NavbarBrand = styled.div`
    display: inline-block;
    color: #fff;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
`;

export const NavItem= styled.span`
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    color: rgba(255,255,255,.75);
`

export default {};