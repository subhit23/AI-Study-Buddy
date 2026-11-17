window.subjects = {
  "C Programming": {
    emoji: "💻",
    examples: [
      ["Explain variables and data types in C", "A variable is a named memory location used to store a value. A data type tells the compiler what kind of value can be stored. Example: int age = 20; stores a whole number, while float marks = 82.5f; stores a decimal value."],
      ["Explain type casting with an example", "Type casting converts a value from one data type to another. Example: float result = (float)5 / 2; gives 2.5 because 5 is converted to a floating-point value before division. Without the cast, integer division gives 2."],
      ["Write the algorithm to find the largest of three numbers", "1. Start. 2. Read a, b and c. 3. If a >= b and a >= c, print a. 4. Otherwise, if b >= a and b >= c, print b. 5. Otherwise print c. 6. Stop."],
      ["What is the difference between while and do-while loops?", "A while loop checks its condition before executing the body, so it may run zero times. A do-while loop checks the condition after the body, so it runs at least once. Both repeat statements while a condition remains true."],
      ["Explain functions in C with an example", "A function is a named block of code that performs a specific task. Example: int square(int n) { return n*n; }. Calling square(4) returns 16. Functions improve reuse, readability and modularity."],
      ["Explain the structure of a C program", "A typical C program contains documentation/comments, preprocessor directives such as #include <stdio.h>, global declarations if needed, the main() function, local declarations, executable statements and a return statement."],
      ["What is the difference between printf and scanf?", "printf() displays formatted output on the screen. scanf() reads formatted input from the user. Example: scanf(\"%d\", &age); reads an integer into age, and printf(\"%d\", age); displays it."],
      ["Explain switch statement with an example", "switch selects a block based on an expression's value. Example: switch(choice) { case 1: printf(\"Add\"); break; case 2: printf(\"Subtract\"); break; default: printf(\"Invalid\"); }. break prevents fall-through to the next case."],
      ["What is an array in C?", "An array stores multiple values of the same data type under one name in contiguous memory. Example: int marks[3] = {70, 80, 90};. Indexing begins at 0, so marks[0] is 70."],
      ["What are compiler errors, runtime errors and logical errors?", "A syntax/compiler error breaks language rules, such as a missing semicolon. A runtime error occurs while the program runs, such as invalid memory access. A logical error lets the program run but produces the wrong result."],
      ["Explain pointers in simple words", "A pointer is a variable that stores a memory address. For example, int n=5; int *p=&n; makes p hold the address of n. *p accesses the value stored at that address. Pointers require careful use."],
      ["What is recursion? Give an example", "Recursion occurs when a function calls itself to solve a smaller version of a problem. A factorial function can return 1 when n<=1, otherwise return n*factorial(n-1). A base case is essential to stop recursion."]
    ]
  },
  "Engineering Mathematics": {
    emoji: "📐",
    examples: [
      ["Explain the derivative of x²", "Using the power rule, d(xⁿ)/dx = n xⁿ⁻¹. Therefore d(x²)/dx = 2x. The derivative represents the instantaneous rate of change or slope of the curve at a point."],
      ["What is a limit? Give an example", "A limit describes the value a function approaches as x approaches a particular value. For example, lim x→2 (x+3)=5 because x+3 approaches 5 when x approaches 2."],
      ["Explain matrix determinant for a 2×2 matrix", "For A = [[a,b],[c,d]], det(A)=ad−bc. Example: for [[2,1],[3,4]], determinant = 2×4−1×3 = 5. A non-zero determinant means the matrix is invertible."],
      ["Solve a simple differential equation dy/dx = 3x²", "Integrate both sides with respect to x: y = ∫3x² dx = x³ + C, where C is the constant of integration."],
      ["What is a partial derivative?", "A partial derivative measures how a multivariable function changes with respect to one variable while other variables are held constant. For f(x,y)=x²+3y, ∂f/∂x=2x and ∂f/∂y=3."],
      ["Explain integration as the reverse of differentiation", "Integration can undo differentiation. Since d(x³)/dx=3x², ∫3x² dx=x³+C. The constant C is included because the derivative of any constant is zero."],
      ["What is a determinant used for?", "Determinants help determine whether a square matrix has an inverse, solve systems of linear equations and study transformations. For a square matrix, a zero determinant means it is singular."],
      ["Explain the chain rule", "If y=f(g(x)), then dy/dx=f'(g(x))·g'(x). Example: y=(3x+1)², so dy/dx=2(3x+1)×3=6(3x+1)."],
      ["What are eigenvalues and eigenvectors?", "For a square matrix A, a non-zero vector v is an eigenvector if Av=λv. The scalar λ is its eigenvalue. They are important in linear transformations and engineering applications."],
      ["Explain continuity at a point", "A function is continuous at x=a when f(a) is defined, the limit as x approaches a exists, and that limit equals f(a). Intuitively, its graph has no break at that point."],
      ["What is a first-order linear differential equation?", "A common form is dy/dx + P(x)y = Q(x). It can be solved using an integrating factor IF=e^(∫P(x)dx), then multiplying the equation by IF and integrating."],
      ["Find the integral of cos x", "∫cos x dx = sin x + C because the derivative of sin x is cos x."]
    ]
  },
  "Engineering Physics": {
    emoji: "⚡",
    examples: [
      ["Explain the photoelectric effect", "The photoelectric effect is the emission of electrons from a material when light of sufficient frequency falls on it. Photon energy is E=hf. Emission occurs when photon energy is at least the work function."],
      ["State de Broglie's hypothesis", "De Broglie proposed that moving particles have wave nature. Their wavelength is λ=h/p, where h is Planck's constant and p is momentum. For a non-relativistic particle, p=mv."],
      ["What is the difference between scalar and vector quantities?", "A scalar has magnitude only, such as mass, time and temperature. A vector has both magnitude and direction, such as displacement, velocity and force."],
      ["Explain the working principle of a laser", "LASER means Light Amplification by Stimulated Emission of Radiation. A laser uses stimulated emission to produce a highly directional, coherent and nearly monochromatic beam. Population inversion and an optical resonator are key components."],
      ["What is semiconductor band gap?", "The band gap is the energy difference between the valence band and conduction band. Conductors have overlapping bands or a very small gap, semiconductors have a relatively small gap, and insulators generally have a large gap."],
      ["State Ohm's law", "At constant physical conditions, current through a conductor is directly proportional to the potential difference across it. V=IR, where V is voltage, I is current and R is resistance."],
      ["What is interference of light?", "Interference occurs when coherent light waves superpose. Depending on their phase difference, they produce constructive interference (greater intensity) or destructive interference (reduced intensity)."],
      ["Explain numerical aperture of an optical fibre", "Numerical aperture indicates the light-gathering ability of an optical fibre. For a fibre in air, NA=√(n₁²−n₂²), where n₁ is the core refractive index and n₂ is the cladding refractive index, assuming the usual step-index model."],
      ["What is the photo diode?", "A photodiode is a semiconductor device that converts incident light into electrical current. It is commonly operated in reverse bias, and its current generally increases with incident light intensity."],
      ["Differentiate between conductors, semiconductors and insulators", "Conductors allow current easily due to many mobile charge carriers. Semiconductors have controllable conductivity and are used in electronic devices. Insulators strongly resist current because their charge carriers are not easily available."],
      ["What is resonance?", "Resonance occurs when a system is driven at or near its natural frequency, producing a large response under suitable damping conditions. It is relevant to oscillations, circuits and mechanical systems."],
      ["Define wavelength, frequency and wave speed", "Wavelength is the distance between corresponding points of adjacent waves; frequency is cycles per second; wave speed is the rate the wave travels. They are related by v=fλ."]
    ]
  },
  "Engineering Chemistry": {
    emoji: "🧪",
    examples: [
      ["What is pH?", "pH is a measure related to hydrogen ion concentration. For dilute aqueous solutions, pH is commonly defined as −log₁₀[H⁺]. A lower pH is more acidic, while a higher pH is more basic."],
      ["Explain hard water", "Hard water contains dissolved calcium and/or magnesium ions. These ions react with soap to form scum and can cause scale in boilers and pipes. Hardness is commonly classified as temporary or permanent."],
      ["What is corrosion?", "Corrosion is the gradual deterioration of a material, usually a metal, due to chemical or electrochemical reactions with its environment. Rusting of iron is a familiar example."],
      ["Explain electrochemical cells", "An electrochemical cell converts chemical energy into electrical energy through redox reactions, or uses electrical energy to drive a chemical reaction. Oxidation occurs at the anode and reduction at the cathode."],
      ["What are polymers?", "Polymers are large molecules made from repeating smaller units called monomers. Examples include polyethylene, PVC, nylon and natural rubber. Their properties depend on structure, chain length and processing."],
      ["What is a catalyst?", "A catalyst changes the rate of a chemical reaction by providing an alternative pathway with lower activation energy. It is regenerated in the overall reaction and does not change the equilibrium position."],
      ["Differentiate between temporary and permanent hardness", "Temporary hardness is mainly due to bicarbonates of calcium and magnesium and can often be removed by boiling. Permanent hardness is commonly due to chlorides and sulfates and requires other treatment methods."],
      ["What is a fuel cell?", "A fuel cell converts the chemical energy of a fuel and oxidant directly into electrical energy through electrochemical reactions. Hydrogen fuel cells produce water as a principal reaction product."],
      ["Explain the Nernst equation in brief", "The Nernst equation relates electrode potential to standard potential and the activities or concentrations of reacting species. At 25°C, a common form is E=E°−(0.0591/n)log Q for a cell reaction under standard assumptions."],
      ["What is green chemistry?", "Green chemistry designs chemical products and processes to reduce or eliminate hazardous substances, waste and energy use. It emphasizes prevention, safer solvents, atom economy and renewable feedstocks where suitable."],
      ["What is an alloy?", "An alloy is a material made by combining a metal with one or more other elements to improve properties. Examples include brass (copper and zinc) and many grades of steel (iron with carbon and other elements)."],
      ["What is adsorption?", "Adsorption is the accumulation of atoms, ions or molecules on the surface of a material. It differs from absorption, in which a substance enters the bulk of another material."]
    ]
  },
  CAED: {
    emoji: "🧩",
    examples: [
      ["What is engineering drawing?", "Engineering drawing is a standard graphical language used to communicate the shape, dimensions and features of components. It uses conventions, views, line types, scales and dimensioning."],
      ["Differentiate first-angle and third-angle projection", "Both methods represent 3D objects on 2D planes. In first-angle projection, the object is between the observer and projection plane; in third-angle projection, the projection plane is between observer and object. View placement differs."],
      ["What is an orthographic projection?", "Orthographic projection represents an object using views projected perpendicular to reference planes, commonly front, top and side views. It communicates dimensions and shape without perspective distortion."],
      ["What is an isometric drawing?", "An isometric drawing shows three dimensions in one view using axes typically separated by 120°. The three principal axes are equally inclined to the projection plane, allowing a pictorial representation."],
      ["What is dimensioning?", "Dimensioning specifies sizes and locations of features using dimension lines, extension lines, arrowheads and numerical values. Correct dimensioning should be clear, complete and avoid unnecessary duplication."],
      ["What is a sectional view?", "A sectional view shows internal details by imagining the object cut by a plane and removing the portion between the observer and the plane. Hatching indicates the cut solid material."],
      ["Explain different types of lines in engineering drawing", "Common lines include visible/object lines, hidden lines, centre lines, dimension lines, extension lines and cutting-plane lines. Each line type communicates a specific feature or instruction."],
      ["What is a scale in engineering drawing?", "A scale is the ratio between drawing size and actual size. Full scale is 1:1, reducing scales are smaller than actual size, and enlarging scales are larger than actual size."],
      ["What is a development of a surface?", "Surface development unfolds a 3D surface onto a flat plane without stretching or tearing it. It is useful for sheet-metal components such as ducts, funnels and packaging."],
      ["What is a CAD system?", "Computer-Aided Design (CAD) software helps create, modify, analyse and document engineering designs. It can improve precision, editing speed, dimensioning and drawing management."],
      ["What is a conic section?", "A conic section is a curve formed by intersecting a plane with a cone. Common types are circle, ellipse, parabola and hyperbola, depending on the plane's orientation."],
      ["Why are standard symbols and conventions important?", "Standard conventions make drawings understandable across teams and industries. They reduce ambiguity in line types, dimensions, projection methods, materials and manufacturing instructions."]
    ]
  },
  "Cyber Security": {
    emoji: "🔐",
    examples: [
      ["What is the CIA triad?", "The CIA triad stands for Confidentiality, Integrity and Availability. Confidentiality limits access to authorised users; integrity protects accuracy and completeness; availability ensures systems and data are accessible when needed."],
      ["What is phishing?", "Phishing is a social-engineering attack in which a message or website impersonates a trusted source to trick someone into revealing information, opening a harmful attachment or approving an unsafe action."],
      ["Explain authentication and authorisation", "Authentication verifies who a user is, for example with a password or passkey. Authorisation determines what an authenticated user is allowed to access or do."],
      ["What is malware? Give examples", "Malware is software designed to harm, disrupt or gain unauthorised access to systems. Examples include viruses, worms, ransomware, spyware and trojans."],
      ["What makes a password safer?", "Use a long, unique password or passphrase for each account, preferably stored in a password manager. Enable multifactor authentication and avoid sharing codes or reusing passwords."],
      ["What is encryption?", "Encryption transforms readable plaintext into ciphertext using an algorithm and key. Decryption converts it back for an authorised party with the required key."],
      ["What is multi-factor authentication?", "MFA requires two or more different kinds of proof, such as something you know (password), something you have (security key or device) and something you are (biometric). It reduces reliance on a password alone."],
      ["What is a firewall?", "A firewall monitors and controls network traffic according to security rules. It can help block unauthorised connections but does not replace updates, secure passwords or user awareness."],
      ["What is social engineering?", "Social engineering manipulates people into revealing information or taking unsafe actions. Common defences include verifying unusual requests independently, slowing down under pressure and never sharing one-time passwords."],
      ["What is a software update important for?", "Updates can fix security vulnerabilities, correct bugs and improve compatibility. Delaying important security updates may leave a device exposed to known attacks."],
      ["What is a backup and why is it useful?", "A backup is a separate copy of important data. It helps recover from accidental deletion, hardware failure, theft or ransomware. Keep backups protected and periodically test restoration."],
      ["What is HTTPS?", "HTTPS uses HTTP over TLS to protect data in transit between a browser and a website. It helps provide encryption and server authentication, but it does not automatically mean a site is trustworthy."]
    ]
  }
};
window.quizData = {
  "C Programming": [
    ["Which symbol usually ends a C statement?", [";", ":", "."], 0, "Most C statements end with a semicolon."],
    ["Which format specifier is commonly used for int?", ["%f", "%d", "%s"], 1, "%d is commonly used for an int in printf/scanf."],
    ["Which loop checks its condition before the body?", ["do-while", "while", "Both always run once"], 1, "A while loop checks first; do-while checks after the body."],
    ["Which operator gets the address of a variable?", ["*", "&", "%"], 1, "The address-of operator is &."],
    ["What does break do in a switch?", ["Repeats the case", "Exits the switch", "Declares a variable"], 1, "break exits the switch or loop."],
    ["Array indexing in C starts at:", ["0", "1", "-1"], 0, "The first element is at index 0."],
    ["Which function reads formatted input?", ["printf()", "scanf()", "puts()"], 1, "scanf() reads formatted input."],
    ["What is the return type of main commonly written in standard hosted C?", ["void only", "int", "char"], 1, "A typical hosted C program uses int main(void) or int main(int argc, char *argv[])."],
    ["Which keyword makes a variable read-only through that identifier?", ["fixed", "const", "static"], 1, "const qualifies an object as not modifiable through that identifier."],
    ["What is recursion?", ["A function calling itself", "A loop with no condition", "A compiler warning"], 0, "Recursive functions call themselves and need a base case."]
  ],
  "Engineering Mathematics": [
    ["Derivative of x³ is:", ["x²", "3x²", "3x"], 1, "Use the power rule."],
    ["∫2x dx equals:", ["x²+C", "2x²+C", "x+C"], 0, "The antiderivative of 2x is x²+C."],
    ["det([[1,2],[3,4]]) equals:", ["-2", "2", "10"], 0, "Determinant = 1×4−2×3 = −2."],
    ["If f(x)=x+4, lim x→2 f(x) is:", ["2", "4", "6"], 2, "Substitute x=2 for this continuous function."],
    ["d(sin x)/dx is:", ["−cos x", "cos x", "−sin x"], 1, "The derivative of sin x is cos x."],
    ["A constant of integration is written as:", ["C", "x", "0"], 0, "Indefinite integrals include an arbitrary constant C."],
    ["For f(x,y)=x²+y, ∂f/∂y is:", ["2x", "1", "y"], 1, "Treat x as constant; derivative of y is 1."],
    ["A matrix with determinant zero is:", ["Always identity", "Singular", "Always diagonal"], 1, "A square matrix with zero determinant is singular."],
    ["The derivative represents the instantaneous:", ["Area only", "Rate of change", "Matrix rank"], 1, "Derivative gives instantaneous rate of change."],
    ["For dy/dx=4x, a solution is:", ["y=4x²+C", "y=2x²+C", "y=x⁴+C"], 1, "Integrating 4x gives 2x²+C."]
  ],
  "Engineering Physics": [
    ["SI unit of frequency is:", ["Hertz", "Newton", "Joule"], 0, "Frequency is measured in hertz (Hz)."],
    ["Which is a vector quantity?", ["Mass", "Temperature", "Velocity"], 2, "Velocity has magnitude and direction."],
    ["Photon energy is given by:", ["E=hf", "E=mc only", "E=V/I"], 0, "Photon energy is Planck's constant times frequency."],
    ["Light in a vacuum is a:", ["Mechanical wave", "Electromagnetic wave", "Sound wave"], 1, "Light is an electromagnetic wave."],
    ["SI unit of force is:", ["Watt", "Newton", "Pascal"], 1, "Force is measured in newtons."],
    ["A photodiode converts light into:", ["Sound only", "Electrical current", "Mechanical force"], 1, "Incident light generates photocurrent."],
    ["Laser light is typically:", ["Highly coherent", "Always white", "A sound wave"], 0, "Laser output is highly coherent and directional."],
    ["Ohm's law is:", ["V=IR", "P=mv", "F=ma²"], 0, "Voltage equals current times resistance under stated conditions."],
    ["De Broglie wavelength is:", ["λ=h/p", "λ=hf", "λ=p/h²"], 0, "The matter-wave wavelength is h divided by momentum."],
    ["Which is a scalar?", ["Force", "Displacement", "Temperature"], 2, "Temperature has magnitude only."]
  ],
  "Engineering Chemistry": [
    ["A pH below 7 is generally:", ["Acidic", "Neutral", "Basic"], 0, "For common aqueous conditions, pH below 7 is acidic."],
    ["Rusting is an example of:", ["Corrosion", "Polymerisation", "Distillation"], 0, "Rusting is corrosion of iron."],
    ["Which is a polymer?", ["PVC", "Sodium chloride", "Copper"], 0, "PVC is a synthetic polymer."],
    ["A catalyst changes the:", ["Reaction rate", "Atomic number", "Equilibrium constant always"], 0, "A catalyst changes rate, not the equilibrium constant."],
    ["Temporary hardness is often reduced by:", ["Boiling", "Freezing only", "Adding sand"], 0, "Boiling can remove bicarbonate-related temporary hardness."],
    ["The anode is where:", ["Oxidation occurs", "Reduction always occurs", "No reaction occurs"], 0, "Oxidation occurs at the anode."],
    ["Green chemistry aims to reduce:", ["Hazardous waste", "All measurement", "All reactions"], 0, "It focuses on preventing waste and reducing hazards."],
    ["Brass is mainly copper and:", ["Zinc", "Iron", "Carbon"], 0, "Brass is a copper-zinc alloy."],
    ["Adsorption takes place mainly at a material's:", ["Surface", "Centre only", "Melting point"], 0, "Adsorption is a surface phenomenon."],
    ["A fuel cell converts chemical energy into:", ["Electrical energy", "Only sound", "Only heat with no current"], 0, "Fuel cells generate electricity through electrochemical reactions."]
  ],
  CAED: [
    ["CAD stands for:", ["Computer-Aided Design", "Computer Added Data", "Control-Axis Drawing"], 0, "CAD is Computer-Aided Design."],
    ["Orthographic views are projected:", ["Perpendicular to projection planes", "Only with perspective", "Only as photographs"], 0, "Orthographic projection uses perpendicular projectors."],
    ["A 1:1 scale means:", ["Full scale", "Half scale", "Double scale"], 0, "Drawing and actual size are equal."],
    ["Which view commonly shows the object from above?", ["Top view", "Front view", "Section view only"], 0, "The top view represents the object as seen from above."],
    ["A centre line commonly indicates:", ["Axis or centre", "Hidden surface only", "Dimension value"], 0, "Centre lines indicate axes, centres and symmetry."],
    ["A section view is useful for showing:", ["Internal details", "Colour only", "Sound"], 0, "Sectioning reveals internal features."],
    ["An isometric drawing shows:", ["Three dimensions in one view", "Only a list of materials", "Only hidden lines"], 0, "It gives a pictorial 3D-like representation."],
    ["Dimension lines communicate:", ["Size or distance", "Material colour", "Software version"], 0, "Dimensions specify sizes and positions."],
    ["A cone-plane intersection can produce a:", ["Conic section", "Compiler", "Data type"], 0, "Circle, ellipse, parabola and hyperbola are conic sections."],
    ["Engineering drawings rely on:", ["Standard conventions", "Guesswork only", "Different symbols for every reader"], 0, "Standards reduce ambiguity and improve communication."]
  ],
  "Cyber Security": [
    ["CIA stands for:", ["Confidentiality, Integrity, Availability", "Control, Internet, Access", "Code, Identity, Antivirus"], 0, "These are the three core security objectives."],
    ["Phishing attempts to:", ["Trick users into revealing information", "Cool a processor", "Improve a password"], 0, "Phishing uses deceptive messages or pages."],
    ["MFA means:", ["Multi-factor authentication", "Main file access", "Multiple firewall algorithm"], 0, "MFA requires more than one authentication factor."],
    ["A password should ideally be:", ["Unique and long", "Shared with friends", "The same for every account"], 0, "Unique long passwords reduce credential reuse risk."],
    ["HTTPS protects data:", ["In transit using TLS", "From every possible scam", "By guaranteeing all sites are honest"], 0, "HTTPS protects the connection but does not guarantee the site is legitimate."],
    ["Malware is:", ["Malicious software", "A monitor cable", "A programming exam"], 0, "Malware is software intended to harm or compromise systems."],
    ["A firewall primarily filters:", ["Network traffic", "Printed pages", "Battery chemistry"], 0, "Firewalls apply rules to network traffic."],
    ["A backup helps recover from:", ["Data loss", "All phishing attempts automatically", "Every hardware issue without restoration"], 0, "A usable backup can restore lost or damaged data."],
    ["Authentication verifies:", ["Identity", "Permission level only", "Internet speed"], 0, "Authorisation is the decision about allowed actions."],
    ["An OTP should be:", ["Kept private", "Posted publicly", "Sent to anyone claiming to be support"], 0, "Never share OTPs, including with callers claiming to be support."]
  ]
};
window.flashData = {
  "C Programming": [
    ["What is a variable?", "A named storage location used to hold a value."],
    ["What is a compiler?", "A program that translates source code into another form, commonly machine code or object code."],
    ["What is an array?", "A collection of same-type elements accessed using an index."],
    ["What is a function?", "A reusable named block of code that performs a task."],
    ["What is type casting?", "Explicit conversion of a value from one data type to another."],
    ["What does & mean in scanf?", "It provides the address of a variable for input in common scanf calls."]
  ],
  "Engineering Mathematics": [
    ["Derivative of xⁿ", "n xⁿ⁻¹"],
    ["Integral of 1/x", "ln|x| + C"],
    ["2×2 determinant", "ad − bc for [[a,b],[c,d]]."],
    ["Continuity at x=a", "The function value and limit exist and are equal."],
    ["Chain rule", "Differentiate the outer function, then multiply by the derivative of the inner function."]
  ],
  "Engineering Physics": [
    ["SI unit of frequency", "Hertz (Hz)."],
    ["Photon energy", "E = hf."],
    ["Ohm's law", "V = IR under constant physical conditions."],
    ["De Broglie wavelength", "λ = h/p."],
    ["Laser", "Light Amplification by Stimulated Emission of Radiation."]
  ],
  "Engineering Chemistry": [
    ["Define pH", "A logarithmic measure related to hydrogen ion concentration."],
    ["Corrosion", "Deterioration of a material due to environmental chemical/electrochemical reactions."],
    ["Polymer", "A large molecule made of repeating units called monomers."],
    ["Green chemistry", "Designing chemical processes/products to reduce hazards and waste."],
    ["Adsorption", "Accumulation of a substance on another material's surface."]
  ],
  CAED: [
    ["CAD", "Computer-Aided Design."],
    ["Orthographic projection", "Representing an object through perpendicular projected views."],
    ["Isometric drawing", "A pictorial representation showing three principal directions in one view."],
    ["Sectional view", "A view that reveals internal features by imagining a cut through the object."],
    ["Scale 1:1", "Full size: drawing dimensions match actual dimensions."]
  ],
  "Cyber Security": [
    ["CIA triad", "Confidentiality, Integrity and Availability."],
    ["Phishing", "A deceptive attempt to steal information or induce an unsafe action."],
    ["Authentication", "Verifying a user's identity."],
    ["Authorisation", "Determining what an authenticated user may access."],
    ["MFA", "Using two or more different types of authentication factor."]
  ]
};
window.defaultTasks = [
  "Revise one important concept",
  "Solve 5 practice questions",
  "Review mistakes from class",
  "Revise C programming or lab work",
  "Spend 20 minutes on the mini project"
];
window.tips = [
  "Try active recall: close your notes and explain a concept in your own words before checking the answer.",
  "Use spaced revision: revisit a topic after one day, three days and one week.",
  "For programming, predict the output before running the code.",
  "For maths, write every step and identify exactly where a mistake happened.",
  "Teach a difficult concept aloud as if explaining it to a classmate.",
  "After a quiz, review wrong answers before taking another quiz.",
  "Study in short focused blocks and keep your phone notifications away."
];
