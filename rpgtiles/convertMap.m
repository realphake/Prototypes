map = imread('map.png');
for i = 1:10,
    array  = '';
    for x = (i-1)*40+1:i*40,
        array = strcat(array, '],[');
        if map(x,y,1) == 0,
            array = strcat(array, '0');
        elseif map(x,y,1) == 255,
            array = strcat(array, '1');
        elseif map(x,y,1) == 34,
            array = strcat(array, '2');
        elseif map(x,y,1) == 237,
            array = strcat(array, '3');
        elseif map(x,y,1) == 185,
            array = strcat(array, '4');
        elseif map(x,y,1) == 15,
            array = strcat(array, '5');
        else
            array = strcat(array, '5');
        end
        for y = 2:400,
            array = strcat(array, ',');
            if map(x,y,1) == 0,
                array = strcat(array, '0');
            elseif map(x,y,1) == 255,
                array = strcat(array, '1');
            elseif map(x,y,1) == 34,
                array = strcat(array, '2');
            elseif map(x,y,1) == 237,
                array = strcat(array, '3');
            elseif map(x,y,1) == 185,
                array = strcat(array, '4');
            elseif map(x,y,1) == 15,
                array = strcat(array, '5');
            else
                array = strcat(array, '5');
            end
        end
    end
    array
end
