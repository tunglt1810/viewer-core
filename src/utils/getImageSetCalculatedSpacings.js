export default function getImageSetCalculatedSpacings(imageSet) {
    // console.log('getImageSetCalculatedSpacings', imageSet);
    const calculatedSpacings = {
        mostUnique: 0,
        max: 0,
        min: 0    
    };

    const spacings = [];
    for (let i = 0; i < imageSet.length; i++) {
        const metadata = imageSet[i].getData().metadata;
        const { ImagePositionPatient, ImageOrientationPatient } = metadata;
        const thisPosition = _getZPosAlongPlaneDirection(ImagePositionPatient, ImageOrientationPatient);
        if (i > 0) {
            if (i !== imageSet.length - 1) spacings[i] = thisPosition;
            spacings[i-1] = _roundToTwo(Math.abs(thisPosition - spacings[i-1]));
        } else spacings.push(thisPosition);
    }

    // 
    const { mostUnique, max, min } = _getImageSetCalculatedSpacings(spacings);
    calculatedSpacings.mostUnique = mostUnique;
    calculatedSpacings.max = max;
    calculatedSpacings.min = min;
    return calculatedSpacings;
}

// Compute true zPos along Plane normals from Image Position Patient (0020,0032) and Image Orientation Patient (0020,0037)
function _getZPosAlongPlaneDirection(imagePos, imageOrient) {
    // console.log('getZPosAlongPlaneDirection', imagePos, imageOrient);
    // image positions, normally this is the top-left coordinate of the image
    const xPos = imagePos[0];
    const yPos = imagePos[1];
    const zPos = imagePos[2];
    // normal vectors along X, Y, Z of the image
    /*
    "C.7.6.2.1.1 Image Position And Image Orientation. The Image Position (0020,0032) specifies the x, y,
     and z coordinates of the upper left hand corner of the image; it is the center of the first voxel transmitted.
     Image Orientation (0020,0037) specifies the direction cosines of the first row and the first column with respect to the patient.
     These Attributes shall be provide as a pair. Row value for the x, y, and z axes respectively followed by the Column value for the x,
     y, and z axes respectively. The direction of the axes is defined fully by the patient's orientation. The x-axis is increasing to the
     left hand side of the patient. The y-axis is increasing to the posterior side of the patient.
     The z-axis is increasing toward the head of the patient. The patient based coordinate system is a right handed system,%
     i.e. the vector cross product of a unit vector along the positive x-axis and a unit vector along the positive y-axis is equal to a unit vector%
     along the positive z-axis."
     
     dst_nrm_dircos_x = dircos(2) * dircos(6) - dircos(3) * dircos(5);
     dst_nrm_dircos_y = dircos(3) * dircos(4) - dircos(1) * dircos(6);
     dst_nrm_dircos_z = dircos(1) * dircos(5) - dircos(2) * dircos(4);
     
     newx = dircos(1) * xpos + dircos(2)* ypos + dircos(3) * zpos;
     newy = dircos(4)* xpos + dircos(5)* ypos + dircos(6) * zpos;
     newz = dst_nrm_dircos_x * xpos + dst_nrm_dircos_y * ypos+ dst_nrm_dircos_z * zpos;
     */
    const dst_normal_IOP_x = imageOrient[2-1] * imageOrient[6-1] - imageOrient[3-1] * imageOrient[5-1];
    const dst_normal_IOP_y = imageOrient[3-1] * imageOrient[4-1] - imageOrient[1-1] * imageOrient[6-1];
    const dst_normal_IOP_z = imageOrient[1-1] * imageOrient[5-1] - imageOrient[2-1] * imageOrient[4-1];

    const newZ = dst_normal_IOP_x * xPos + dst_normal_IOP_y * yPos + dst_normal_IOP_z * zPos;
    return newZ;
}

function _roundToTwo(num) {    
    return +(Math.round(num + 'e+2')  + 'e-2');
}
// return an array of spacing between instances in the set
function _getImageSetCalculatedSpacings(spacings) {
    // console.time('_getImageSetCalculatedSpacings');
    const unique_values = [...new Set(spacings)];
    const count = new Array(unique_values.length).fill(0);
    let max = 0;
    let min = Infinity;
    // console.log('_getImageSetCalculatedSpacings uniques', unique_values);
    spacings.forEach((spacing) => {
        if (spacing > max) max = spacing;
        if (spacing < min) min = spacing;
        unique_values.forEach((val, index) => {
            if (val === spacing) count[index]++;
        });
    });
    // console.log('_getImageSetCalculatedSpacings count', count);
    const maxCountIndex = count.indexOf(Math.max(...count));
    // console.timeEnd('_getImageSetCalculatedSpacings');
    return { mostUnique: unique_values[maxCountIndex], max: max, min: min };
}