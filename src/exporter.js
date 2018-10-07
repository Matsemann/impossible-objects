import OBJExporter from "three-obj-exporter";

function traversable(objects) {
    return {
        traverse: function (fn) {
            objects.forEach(o => {
                fn(o);
            });
        }
    }
}

export function exportToObj(objects) {
    console.log("exporting, added to window.objFile");
    let objFile = new OBJExporter().parse(traversable(objects));
    window.objFile = objFile;
    console.log("copy(window.objFile) and paste into notepad");
    return objFile;
}