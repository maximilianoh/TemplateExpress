import React, { useEffect, useState } from 'react';

const { M } = window;

const CollapsibleSideBar = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const menuOptions = [
      { name: 'Github', url: 'https://github.com/dogfalo/materialize/' },
      { name: 'Twitter', url: 'https://twitter.com/MaterializeCSS' },
      { name: 'Docs', url: 'http://next.materializecss.com/getting-started.html' },
      {
        name: 'Dropdown1',
        url: '',
        list: [
          { name: 'First', url: 'First' },
          { name: 'Second', url: 'Second' },
          { name: 'Third', url: 'Third' },
        ],
      },
      {
        name: 'Dropdown2',
        url: '',
        list: [
          { name: 'First', url: 'First' },
          { name: 'Second', url: 'Second' },
        ],
      },
    ];
    setMenu(menuOptions);
  }, []);
  useEffect(() => {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach((col) => {
      M.Collapsible.init(col);
    });
  }, [menu]);
  const menuRender = () => {
    if (!menu.length) return <></>;
    const menuOptions = menu.map((m) => {
      let component;
      if (m.list) {
        const c = m.list.map((subM) => (
          <li key={m.name + subM.name}>
            <a
              className="waves-effect"
              href={subM.url}
              style={{ paddingLeft: '50px' }}
            >
              {subM.name}
            </a>
          </li>
        ));

        component = (
          <li key={m.name}>
            <ul className="collapsible collapsible-accordion">
              <li>
                <button
                  type="button"
                  className="collapsible-header
                waves-effect"
                  style={{ width: '100%', paddingLeft: '32px' }}
                >
                  {m.name}
                  <i className="material-icons">folder</i>
                </button>
                <div className="collapsible-body">
                  <ul>
                    { c }
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        );
      } else {
        component = (
          <li key={m.name}>
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {m.name}
            </a>
          </li>
        );
      }

      return component;
    });

    return menuOptions;
  };
  return (
    <>
      {
        menuRender()
      }
    </>
  );
};

export default CollapsibleSideBar;
