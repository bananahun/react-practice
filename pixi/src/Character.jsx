import CharacterImages from "./CharacterImages";
import { useState, useEffect, useCallback } from "react";
import { Sprite } from '@pixi/react'

const Direction = {
  DOWN: "0",
  UP: "1",
  LEFT: "2",
  RIGHT: "3",
};

const MAP_X = 800;
const MAP_Y = 600;
const SIZE = 6;

const Character = () => {
  const [catImage, setCatImage] = useState(CharacterImages.char_1d1);
  const [catX, setCatX] = useState(500);
  const [catY, setCatY] = useState(150);
  const [direction, setDirection] = useState(Direction.DOWN);
  const [stepIndex, setStepIndex] = useState(0);

  const handleArrowKeyDown = useCallback(
    (e) => {
      const distance = 4;
      const ArrowKeys = [
        {
          code: "KeyW",
          movement: { x: 0, y: -distance },
          dir: Direction.UP,
          isMoveable: () => catY > 0,
          images: [
            CharacterImages.char_1u1,
            CharacterImages.char_1u2,
            CharacterImages.char_1u3,
            CharacterImages.char_1u4,
            CharacterImages.char_1u5,
            CharacterImages.char_1u6,
            CharacterImages.char_1u7,
            CharacterImages.char_1u8,
          ],
        },
        {
          code: "KeyS",
          movement: { x: 0, y: distance },
          dir: Direction.DOWN,
          isMoveable: () => catY < MAP_Y - SIZE,
          images: [
            CharacterImages.char_1d1,
            CharacterImages.char_1d2,
            CharacterImages.char_1d3,
            CharacterImages.char_1d4,
            CharacterImages.char_1d5,
            CharacterImages.char_1d6,
            CharacterImages.char_1d7,
            CharacterImages.char_1d8,
          ],
        },
        {
          code: "KeyD",
          movement: { x: distance, y: 0 },
          dir: Direction.RIGHT,
          isMoveable: () => catX < MAP_X - SIZE,
          images: [
            CharacterImages.char_1r1,
            CharacterImages.char_1r2,
            CharacterImages.char_1r3,
            CharacterImages.char_1r4,
            CharacterImages.char_1r5,
            CharacterImages.char_1r6,
            CharacterImages.char_1r7,
            CharacterImages.char_1r8,
          ],
        },
        {
          code: "KeyA",
          movement: { x: -distance, y: 0 },
          dir: Direction.LEFT,
          isMoveable: () => catX > 0,
          images: [
            CharacterImages.char_1l1,
            CharacterImages.char_1l2,
            CharacterImages.char_1l3,
            CharacterImages.char_1l4,
            CharacterImages.char_1l5,
            CharacterImages.char_1l6,
            CharacterImages.char_1l7,
            CharacterImages.char_1l8,
          ],
        },
      ];

      let handled = false;
      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, movement, dir, isMoveable, images } = ArrowKeys[i];

        if (e.code === code && isMoveable()) {
          setCatX((prev) => prev + movement.x);
          setCatY((prev) => prev + movement.y);
          setDirection(dir);
          setStepIndex((prev) => (prev + 1) % images.length);
          setCatImage(images[(stepIndex + 1) % images.length]);
          handled = true;
          break;
        }
      }

      if (handled) {
        e.preventDefault();
      }
    },
    [catX, catY, stepIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeyDown);

    return () => {
      document.removeEventListener("keydown", handleArrowKeyDown);
    };
  }, [handleArrowKeyDown]);

  useEffect(() => {
    const directionImages = {
      [Direction.UP]: [
        CharacterImages.char_1u1,
        CharacterImages.char_1u2,
        CharacterImages.char_1u3,
        CharacterImages.char_1u4,
        CharacterImages.char_1u5,
        CharacterImages.char_1u6,
        CharacterImages.char_1u7,
        CharacterImages.char_1u8,
      ],
      [Direction.DOWN]: [
        CharacterImages.char_1d1,
        CharacterImages.char_1d2,
        CharacterImages.char_1d3,
        CharacterImages.char_1d4,
        CharacterImages.char_1d5,
        CharacterImages.char_1d6,
        CharacterImages.char_1d7,
        CharacterImages.char_1d8,
      ],
      [Direction.RIGHT]: [
        CharacterImages.char_1r1,
        CharacterImages.char_1r2,
        CharacterImages.char_1r3,
        CharacterImages.char_1r4,
        CharacterImages.char_1r5,
        CharacterImages.char_1r6,
        CharacterImages.char_1r7,
        CharacterImages.char_1r8,
      ],
      [Direction.LEFT]: [
        CharacterImages.char_1l1,
        CharacterImages.char_1l2,
        CharacterImages.char_1l3,
        CharacterImages.char_1l4,
        CharacterImages.char_1l5,
        CharacterImages.char_1l6,
        CharacterImages.char_1l7,
        CharacterImages.char_1l8,
      ],
    };

    setCatImage(directionImages[direction][stepIndex]);
  }, [direction, stepIndex]);

  return <Sprite image={catImage.src} x={catX} y={catY} />;
};

export default Character;