import React from 'react';

interface AccordionProps {
  accordionTerms: string;
  collapseNumber: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  accordionTerms,
  collapseNumber,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(
    collapseNumber === 'collapseOne' ? true : false
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion mt-3' id={`accordionExample${collapseNumber}`}>
      <div className='accordion-item' style={{ borderRadius: '0' }}>
        <h3
          className='accordion-header bd-title mb-0'
          id={`heading${collapseNumber}`}
        >
          <button
            className={`accordion-button fs-4 ${isOpen ? '' : 'collapsed'}`}
            type='button'
            aria-expanded={isOpen}
            aria-controls={`collapse${collapseNumber}`}
            onClick={handleToggle}
          >
            {accordionTerms}
          </button>
        </h3>
        <div
          id={`collapse${collapseNumber}`}
          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
          aria-labelledby={`heading${collapseNumber}`}
          data-bs-parent={`#accordionExample${collapseNumber}`}
        >
          <div className='accordion-body bg-light'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
