import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter) {
    const fighterInfos = createElement({ tagName: 'ul', className: 'fighterInfo' });
    Object.keys(fighter)
      .filter(key => key !== '_id' && key !== 'source')
      .forEach(key => {
        const childElement = createElement({ tagName: 'li' });
        childElement.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${fighter[key]}`;
        fighterInfos.appendChild(childElement);
      });

    fighterElement.appendChild(createFighterImage(fighter));
    fighterElement.appendChild(fighterInfos);
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
