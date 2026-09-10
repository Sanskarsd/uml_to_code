import { useState } from "react";
import "./App.css";

type AccessModifier = "+" | "-" | "#";

type ClassType = "class" | "abstract" | "interface";

type ClassAccess = "public" | "private" | "protected";

type Language = "java" | "python" | "cpp";

type Attribute = {
  id: number;
  access: AccessModifier;
  name: string;
  type: string;
};

type Parameter = {
  id: number;
  name: string;
  type: string;
};

type Method = {
  id: number;
  access: AccessModifier;
  name: string;
  returnType: string;
  isAbstract: boolean;
  parameters: Parameter[];
};

const accessMap: Record<AccessModifier, string> = {
  "+": "public",
  "-": "private",
  "#": "protected",
};

function App() {
  /* =========================================
     CLASS STATE
  ========================================= */

  const [className, setClassName] = useState("Student");

  const [classAccess, setClassAccess] =
    useState<ClassAccess>("public");

  const [classType, setClassType] =
    useState<ClassType>("class");

  const [hasConstructor, setHasConstructor] =
    useState(true);

  const [language, setLanguage] =
    useState<Language>("java");

  /* =========================================
     ATTRIBUTE STATE
  ========================================= */

  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: 1,
      access: "-",
      name: "studId",
      type: "int",
    },
    {
      id: 2,
      access: "+",
      name: "name",
      type: "String",
    },
    {
      id: 3,
      access: "#",
      name: "age",
      type: "int",
    },
  ]);

  /* =========================================
     METHOD STATE
  ========================================= */

  const [methods, setMethods] = useState<Method[]>([
    {
      id: 1,
      access: "+",
      name: "learn",
      returnType: "void",
      isAbstract: false,
      parameters: [
        {
          id: 1,
          name: "topic",
          type: "String",
        },
      ],
    },
  ]);

  /* =========================================
     GENERATED CODE
  ========================================= */

  const [code, setCode] = useState("");

  const [copied, setCopied] = useState(false);

  /* =========================================
     ATTRIBUTE FUNCTIONS
  ========================================= */

  const addAttribute = () => {
    const newAttribute: Attribute = {
      id: Date.now(),
      access: "-",
      name: "variable",
      type: "String",
    };

    setAttributes((current) => [
      ...current,
      newAttribute,
    ]);
  };

  const updateAttribute = (
    id: number,
    field: keyof Attribute,
    value: string
  ) => {
    setAttributes((current) =>
      current.map((attribute) =>
        attribute.id === id
          ? {
              ...attribute,
              [field]: value,
            }
          : attribute
      )
    );
  };

  const deleteAttribute = (id: number) => {
    setAttributes((current) =>
      current.filter(
        (attribute) => attribute.id !== id
      )
    );
  };

  /* =========================================
     METHOD FUNCTIONS
  ========================================= */

  const addMethod = () => {
    const newMethod: Method = {
      id: Date.now(),
      access: "+",
      name: "method",
      returnType: "void",
      isAbstract: false,
      parameters: [],
    };

    setMethods((current) => [
      ...current,
      newMethod,
    ]);
  };

  const updateMethod = (
    id: number,
    field: keyof Method,
    value: string | boolean
  ) => {
    setMethods((current) =>
      current.map((method) =>
        method.id === id
          ? {
              ...method,
              [field]: value,
            }
          : method
      )
    );
  };

  const deleteMethod = (id: number) => {
    setMethods((current) =>
      current.filter(
        (method) => method.id !== id
      )
    );
  };

  /* =========================================
     PARAMETER FUNCTIONS
  ========================================= */

  const addParameter = (methodId: number) => {
    const newParameter: Parameter = {
      id: Date.now(),
      name: "param",
      type: "String",
    };

    setMethods((current) =>
      current.map((method) =>
        method.id === methodId
          ? {
              ...method,
              parameters: [
                ...method.parameters,
                newParameter,
              ],
            }
          : method
      )
    );
  };

  const updateParameter = (
    methodId: number,
    parameterId: number,
    field: keyof Parameter,
    value: string
  ) => {
    setMethods((current) =>
      current.map((method) =>
        method.id === methodId
          ? {
              ...method,
              parameters: method.parameters.map(
                (parameter) =>
                  parameter.id === parameterId
                    ? {
                        ...parameter,
                        [field]: value,
                      }
                    : parameter
              ),
            }
          : method
      )
    );
  };

  const deleteParameter = (
    methodId: number,
    parameterId: number
  ) => {
    setMethods((current) =>
      current.map((method) =>
        method.id === methodId
          ? {
              ...method,
              parameters:
                method.parameters.filter(
                  (parameter) =>
                    parameter.id !== parameterId
                ),
            }
          : method
      )
    );
  };

  /* =========================================
     JAVA GENERATOR
  ========================================= */

  const generateJava = () => {
    const name =
      className.trim() || "MyClass";

    let declaration = "";

    if (classType === "interface") {
      declaration =
        `${classAccess} interface ${name}`;
    } else if (classType === "abstract") {
      declaration =
        `${classAccess} abstract class ${name}`;
    } else {
      declaration =
        `${classAccess} class ${name}`;
    }

    const attributeCode = attributes
      .filter(
        (attribute) =>
          attribute.name.trim() &&
          attribute.type.trim()
      )
      .map((attribute) => {
        return `    ${accessMap[attribute.access]} ${attribute.type.trim()} ${attribute.name.trim()};`;
      })
      .join("\n");

    let constructorCode = "";

    if (
      hasConstructor &&
      classType !== "interface"
    ) {
      constructorCode =
        `    ${classAccess} ${name}() {\n    }`;
    }

    const methodCode = methods
      .filter(
        (method) =>
          method.name.trim() &&
          method.returnType.trim()
      )
      .map((method) => {
        const params = method.parameters
          .filter(
            (parameter) =>
              parameter.name.trim() &&
              parameter.type.trim()
          )
          .map(
            (parameter) =>
              `${parameter.type.trim()} ${parameter.name.trim()}`
          )
          .join(", ");

        if (classType === "interface") {
          return `    ${accessMap[method.access]} ${method.returnType.trim()} ${method.name.trim()}(${params});`;
        }

        if (method.isAbstract) {
          return `    ${accessMap[method.access]} abstract ${method.returnType.trim()} ${method.name.trim()}(${params});`;
        }

        return `    ${accessMap[method.access]} ${method.returnType.trim()} ${method.name.trim()}(${params}) {\n    }`;
      })
      .join("\n\n");

    const sections = [
      attributeCode,
      constructorCode,
      methodCode,
    ].filter(Boolean);

    const body =
      sections.length > 0
        ? `\n\n${sections.join("\n\n")}\n\n`
        : "\n\n";

    return `${declaration} {${body}}`;
  };

  /* =========================================
     PYTHON GENERATOR
  ========================================= */

  const generatePython = () => {
    const name =
      className.trim() || "MyClass";

    let declaration = `class ${name}:`;

    if (classType === "interface") {
      declaration = `from abc import ABC, abstractmethod\n\nclass ${name}(ABC):`;
    } else if (classType === "abstract") {
      declaration = `from abc import ABC, abstractmethod\n\nclass ${name}(ABC):`;
    }

    const lines: string[] = [];

    /* Attributes */

    attributes
      .filter(
        (attribute) =>
          attribute.name.trim() &&
          attribute.type.trim()
      )
      .forEach((attribute) => {
        const defaultValue =
          attribute.type === "int"
            ? "0"
            : attribute.type === "float"
              ? "0.0"
              : attribute.type === "bool"
                ? "False"
                : '""';

        lines.push(
          `    ${attribute.name.trim()} = ${defaultValue}`
        );
      });

    /* Constructor */

    if (
      hasConstructor &&
      classType !== "interface"
    ) {
      lines.push(
        `    def __init__(self):\n        pass`
      );
    }

    /* Methods */

    methods
      .filter(
        (method) =>
          method.name.trim() &&
          method.returnType.trim()
      )
      .forEach((method) => {
        const params = method.parameters
          .filter(
            (parameter) =>
              parameter.name.trim()
          )
          .map(
            (parameter) =>
              `${parameter.name.trim()}: ${parameter.type.trim()}`
          )
          .join(", ");

        const allParams = params
          ? `self, ${params}`
          : "self";

        if (
          method.isAbstract ||
          classType === "interface"
        ) {
          lines.push(
            `    @abstractmethod\n    def ${method.name.trim()}(${allParams}) -> ${method.returnType.trim()}:\n        pass`
          );
        } else {
          lines.push(
            `    def ${method.name.trim()}(${allParams}) -> ${method.returnType.trim()}:\n        pass`
          );
        }
      });

    if (lines.length === 0) {
      lines.push("    pass");
    }

    return `${declaration}\n${lines.join("\n\n")}`;
  };

  /* =========================================
     C++ GENERATOR
  ========================================= */

  const generateCpp = () => {
    const name =
      className.trim() || "MyClass";

    let declaration = "";

    if (classType === "interface") {
      declaration = `class ${name}`;
    } else {
      declaration = `class ${name}`;
    }

    const publicAttributes: string[] = [];
    const privateAttributes: string[] = [];
    const protectedAttributes: string[] = [];

    attributes
      .filter(
        (attribute) =>
          attribute.name.trim() &&
          attribute.type.trim()
      )
      .forEach((attribute) => {
        const line =
          `    ${attribute.type.trim()} ${attribute.name.trim()};`;

        if (attribute.access === "+") {
          publicAttributes.push(line);
        } else if (attribute.access === "#") {
          protectedAttributes.push(line);
        } else {
          privateAttributes.push(line);
        }
      });

    const publicMethods: string[] = [];
    const privateMethods: string[] = [];
    const protectedMethods: string[] = [];

    methods
      .filter(
        (method) =>
          method.name.trim() &&
          method.returnType.trim()
      )
      .forEach((method) => {
        const params = method.parameters
          .filter(
            (parameter) =>
              parameter.name.trim() &&
              parameter.type.trim()
          )
          .map(
            (parameter) =>
              `${parameter.type.trim()} ${parameter.name.trim()}`
          )
          .join(", ");

        let line = "";

        if (method.isAbstract) {
          line =
            `    virtual ${method.returnType.trim()} ${method.name.trim()}(${params}) = 0;`;
        } else {
          line =
            `    ${method.returnType.trim()} ${method.name.trim()}(${params}) {}`;
        }

        if (method.access === "+") {
          publicMethods.push(line);
        } else if (method.access === "#") {
          protectedMethods.push(line);
        } else {
          privateMethods.push(line);
        }
      });

    let constructorCode = "";

    if (
      hasConstructor &&
      classType !== "interface"
    ) {
      constructorCode =
        `    ${name}() {}`;
    }

    const sections: string[] = [];

    if (
      publicAttributes.length > 0 ||
      publicMethods.length > 0 ||
      constructorCode
    ) {
      const content = [
        ...publicAttributes,
        constructorCode,
        ...publicMethods,
      ].filter(Boolean);

      sections.push(
        `public:\n${content.join("\n\n")}`
      );
    }

    if (
      protectedAttributes.length > 0 ||
      protectedMethods.length > 0
    ) {
      sections.push(
        `protected:\n${[
          ...protectedAttributes,
          ...protectedMethods,
        ].join("\n\n")}`
      );
    }

    if (
      privateAttributes.length > 0 ||
      privateMethods.length > 0
    ) {
      sections.push(
        `private:\n${[
          ...privateAttributes,
          ...privateMethods,
        ].join("\n\n")}`
      );
    }

    if (sections.length === 0) {
      sections.push("public:");
    }

    return `${declaration} {\n\n${sections
      .map((section) => `    ${section}`)
      .join("\n\n")}\n\n};`;
  };

  /* =========================================
     GENERATE CODE
  ========================================= */

  const generateCode = () => {
    let generatedCode = "";

    if (language === "java") {
      generatedCode = generateJava();
    }

    if (language === "python") {
      generatedCode = generatePython();
    }

    if (language === "cpp") {
      generatedCode = generateCpp();
    }

    setCode(generatedCode);
    setCopied(false);
  };

  /* =========================================
     COPY CODE
  ========================================= */

  const copyCode = async () => {
    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy code:",
        error
      );
    }
  };

  /* =========================================
     FILE EXTENSION
  ========================================= */

  const getFileExtension = () => {
    if (language === "python") {
      return "py";
    }

    if (language === "cpp") {
      return "cpp";
    }

    return "java";
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <h1>
          UML to Code Converter
        </h1>

        <div className="header-right">

          <span>Output:</span>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value as Language
              )
            }
          >
            <option value="java">
              Java
            </option>

            <option value="python">
              Python
            </option>

            <option value="cpp">
              C++
            </option>
          </select>

        </div>

      </header>


      {/* MAIN */}

      <main className="main-container">

        {/* LEFT PANEL */}

        <section className="left-panel">

          <h2>
            CLASS DIAGRAM
          </h2>


          {/* CLASS PROPERTIES */}

          <div className="class-properties">

            <div className="property-title">
              CLASS PROPERTIES
            </div>


            {/* Class Name */}

            <div className="property-group">

              <label>
                Class Name
              </label>

              <input
                type="text"
                value={className}
                onChange={(e) =>
                  setClassName(
                    e.target.value
                  )
                }
                placeholder="Class name"
              />

            </div>


            {/* Access */}

            <div className="property-group">

              <label>
                Access
              </label>

              <select
                value={classAccess}
                onChange={(e) =>
                  setClassAccess(
                    e.target.value as ClassAccess
                  )
                }
              >
                <option value="public">
                  public
                </option>

                <option value="private">
                  private
                </option>

                <option value="protected">
                  protected
                </option>
              </select>

            </div>


            {/* Class Type */}

            <div className="property-group">

              <label>
                Type
              </label>

              <select
                value={classType}
                onChange={(e) =>
                  setClassType(
                    e.target.value as ClassType
                  )
                }
              >
                <option value="class">
                  Class
                </option>

                <option value="abstract">
                  Abstract Class
                </option>

                <option value="interface">
                  Interface
                </option>
              </select>

            </div>


            {/* Constructor */}

            {classType !== "interface" && (
              <label className="checkbox-row">

                <input
                  type="checkbox"
                  checked={hasConstructor}
                  onChange={(e) =>
                    setHasConstructor(
                      e.target.checked
                    )
                  }
                />

                Has Constructor

              </label>
            )}

          </div>


          {/* ATTRIBUTES */}

          <div className="editor-section">

            <div className="section-header">

              <h3>
                ATTRIBUTES
              </h3>

              <button
                className="add-button"
                onClick={addAttribute}
              >
                + Add
              </button>

            </div>


            {attributes.length === 0 && (
              <div className="empty-message">
                No attributes added
              </div>
            )}


            {attributes.map((attribute) => (

              <div
                className="attribute-row"
                key={attribute.id}
              >

                <select
                  value={attribute.access}
                  onChange={(e) =>
                    updateAttribute(
                      attribute.id,
                      "access",
                      e.target.value
                    )
                  }
                >
                  <option value="-">
                    -
                  </option>

                  <option value="+">
                    +
                  </option>

                  <option value="#">
                    #
                  </option>
                </select>


                <input
                  type="text"
                  value={attribute.name}
                  onChange={(e) =>
                    updateAttribute(
                      attribute.id,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Variable name"
                />


                <input
                  type="text"
                  value={attribute.type}
                  onChange={(e) =>
                    updateAttribute(
                      attribute.id,
                      "type",
                      e.target.value
                    )
                  }
                  placeholder="Type"
                />


                <button
                  className="delete-button"
                  onClick={() =>
                    deleteAttribute(
                      attribute.id
                    )
                  }
                >
                  ×
                </button>

              </div>

            ))}

          </div>


          {/* METHODS */}

          <div className="editor-section">

            <div className="section-header">

              <h3>
                METHODS
              </h3>

              <button
                className="add-button"
                onClick={addMethod}
              >
                + Add
              </button>

            </div>


            {methods.length === 0 && (
              <div className="empty-message">
                No methods added
              </div>
            )}


            {methods.map((method) => (

              <div
                className="method-card"
                key={method.id}
              >

                {/* Method */}

                <div className="method-row">

                  <select
                    value={method.access}
                    onChange={(e) =>
                      updateMethod(
                        method.id,
                        "access",
                        e.target.value
                      )
                    }
                  >
                    <option value="-">
                      -
                    </option>

                    <option value="+">
                      +
                    </option>

                    <option value="#">
                      #
                    </option>
                  </select>


                  <input
                    type="text"
                    value={method.name}
                    onChange={(e) =>
                      updateMethod(
                        method.id,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Method name"
                  />


                  <input
                    type="text"
                    value={method.returnType}
                    onChange={(e) =>
                      updateMethod(
                        method.id,
                        "returnType",
                        e.target.value
                      )
                    }
                    placeholder="Return type"
                  />


                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteMethod(
                        method.id
                      )
                    }
                  >
                    ×
                  </button>

                </div>


                {/* Method Options */}

                <div className="method-options">

                  <label className="checkbox-row">

                    <input
                      type="checkbox"
                      checked={
                        method.isAbstract
                      }
                      disabled={
                        classType ===
                        "interface"
                      }
                      onChange={(e) =>
                        updateMethod(
                          method.id,
                          "isAbstract",
                          e.target.checked
                        )
                      }
                    />

                    Abstract

                  </label>


                  <button
                    className="parameter-button"
                    onClick={() =>
                      addParameter(
                        method.id
                      )
                    }
                  >
                    + Parameter
                  </button>

                </div>


                {/* PARAMETERS */}

                {method.parameters.length > 0 && (

                  <div className="parameters">

                    <div className="parameter-title">
                      PARAMETERS
                    </div>


                    {method.parameters.map(
                      (parameter) => (

                        <div
                          className="parameter-row"
                          key={parameter.id}
                        >

                          <input
                            type="text"
                            value={
                              parameter.name
                            }
                            onChange={(e) =>
                              updateParameter(
                                method.id,
                                parameter.id,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Parameter name"
                          />


                          <input
                            type="text"
                            value={
                              parameter.type
                            }
                            onChange={(e) =>
                              updateParameter(
                                method.id,
                                parameter.id,
                                "type",
                                e.target.value
                              )
                            }
                            placeholder="Type"
                          />


                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteParameter(
                                method.id,
                                parameter.id
                              )
                            }
                          >
                            ×
                          </button>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            ))}

          </div>


          {/* UML PREVIEW */}

          <div className="uml-area">

            <div className="uml-class">

              <div className="uml-class-name">

                <div className="uml-class-stereotype">

                  {classType ===
                    "interface" &&
                    "«interface»"}

                  {classType ===
                    "abstract" &&
                    "«abstract»"}

                </div>

                <div>
                  {className.trim() ||
                    "MyClass"}
                </div>

              </div>


              {/* UML ATTRIBUTES */}

              <div className="uml-attributes">

                {attributes.length === 0 ? (
                  <div>&nbsp;</div>
                ) : (
                  attributes.map(
                    (attribute) => (

                      <div
                        className="uml-line"
                        key={attribute.id}
                      >
                        {attribute.access}{" "}
                        {attribute.name ||
                          "variable"}{" "}
                        :{" "}
                        {attribute.type ||
                          "Type"}
                      </div>

                    )
                  )
                )}

              </div>


              {/* UML METHODS */}

              <div className="uml-methods">

                {methods.length === 0 ? (
                  <div>&nbsp;</div>
                ) : (
                  methods.map(
                    (method) => {

                      const parameters =
                        method.parameters
                          .filter(
                            (parameter) =>
                              parameter.name.trim()
                          )
                          .map(
                            (parameter) =>
                              `${parameter.name} : ${parameter.type}`
                          )
                          .join(", ");

                      return (
                        <div
                          className="uml-line"
                          key={method.id}
                        >

                          {method.access}{" "}

                          {method.isAbstract &&
                            "{abstract} "}

                          {method.name ||
                            "method"}

                          ({parameters})

                          {" : "}

                          {method.returnType ||
                            "void"}

                        </div>
                      );
                    }
                  )
                )}

              </div>

            </div>

          </div>


          {/* CONVERT */}

          <button
            className="convert-button"
            onClick={generateCode}
          >
            Convert to Code
          </button>

        </section>


        {/* RIGHT PANEL */}

        <section className="right-panel">

          <div className="code-header">

            <h2>
              {className.trim() ||
                "MyClass"}
              .{getFileExtension()}
            </h2>


            <button
              className="copy-button"
              onClick={copyCode}
              disabled={!code}
            >
              {copied
                ? "Copied!"
                : "Copy"}
            </button>

          </div>


          <div className="code-container">

            {code ? (

              <pre className="java-code">
                <code>
                  {code}
                </code>
              </pre>

            ) : (

              <div className="code-placeholder">
                Click "Convert to Code" to
                generate{" "}
                {language === "java"
                  ? "Java"
                  : language === "python"
                    ? "Python"
                    : "C++"}{" "}
                source code.
              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;