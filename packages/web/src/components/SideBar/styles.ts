import styled from 'styled-components';

interface IconProps {
	readonly isSelected: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
`;

export const Svg = styled.svg`
	fill: #000;	
`;

export const Icon = styled.span<IconProps>`
	display: flex;	
	align-items: center;
	justify-content: center;
	height: 40px;
	width: 40px;
	border-radius: 50px;
	margin: 20px 0px;
  background-color: ${({isSelected, theme}) => isSelected ? theme.selectedIconBackgroundColor : 'transparent'};   
	
	${Svg} {
    fill: ${({isSelected, theme}) => isSelected ? theme.selectedIconColor : theme.iconColor}; 
  }
`;
