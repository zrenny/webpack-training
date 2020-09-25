// fileA.js
import "moduleA";
import("moduleB");
import "moduleC";

// fileB.js
import("moduleA");
import("moduleB");
import "moduleC";

/* ---With async (Only optimize dynamically imported modules)
    bundle1 --- moduleB
    fileA.bundle --- moduleA, moduleC
    fileB.bundle --- moduleC
    bundle2 --- moduleA
*/

/* ---With initial (Only optimize statically imported modules)
    bundle1 --- moduleB
    bundle2 --- moduleC
    bundle3 --- moduleA
    bundle4 --- moduleA
    fileA.bundle
    fileB.bundle
*/

/* --With all (Optimize both statically and dynamically imported modules)
    bundle1 --- moduleB
    bundle2 --- moduleA
    bundle3 --- moduleC
    fileA.bundle
    fileB.bundle
*/
