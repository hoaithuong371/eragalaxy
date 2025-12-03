import { MemoryItem, MemoryType } from './types';

// Helper to generate random range
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

const MESSAGES = [
  "Anh nhớ em", "Mãi bên nhau", "Ký ức ngọt ngào", "Tình yêu vĩnh cửu",
  "Nụ cười của em", "Ánh mắt ấy", "Ngày đầu tiên", "Hạnh phúc đơn giản",
  "Trái tim loạn nhịp", "Giấc mơ có em", "Nắm tay anh nhé", "Mùa thu năm ấy",
  "Yêu thương đong đầy", "Vũ trụ này là của ta", "Chờ đợi là hạnh phúc",
  "Gửi ngàn nụ hôn", "Forever Love", "My Destiny", "You are my world",
  "Every moment with you"
];

// Use specific IDs to ensure stability. 
// Adding .jpg to the end of Picsum URLs can sometimes help with direct linking behavior.
const IMAGE_URLS = [
  "https://picsum.photos/id/10/300/400.jpg",
  "https://picsum.photos/id/14/300/300.jpg",
  "https://picsum.photos/id/16/400/300.jpg",
  "https://picsum.photos/id/24/300/400.jpg",
  "https://picsum.photos/id/28/300/300.jpg",
  "https://picsum.photos/id/42/300/400.jpg",
  "https://picsum.photos/id/55/300/400.jpg",
  "https://picsum.photos/id/60/300/300.jpg",
];

export const generateMemories = (count: number): MemoryItem[] => {
  const memories: MemoryItem[] = [];

  for (let i = 0; i < count; i++) {
    // 85% Text, 15% Images (Increased text density)
    const isText = Math.random() > 0.15;
    const type = isText ? MemoryType.TEXT : MemoryType.IMAGE;
    
    // CYLINDER LAYOUT LOGIC (Surrounding the user)
    const angle = randomRange(0, Math.PI * 2); // 360 degrees
    const radius = randomRange(15, 30); // Distance from center
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Text: Random Y anywhere in view (-20 to 30) to start filled
    // Image: Bias towards top (10 to 40)
    const y = isText ? randomRange(-20, 40) : randomRange(15, 50);

    memories.push({
      id: `mem-${i}`,
      type,
      content: isText 
        ? MESSAGES[Math.floor(Math.random() * MESSAGES.length)] 
        : IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)],
      initialPosition: [x, y, z],
      speed: randomRange(0.05, 0.2), // Falling speed
      scale: isText ? randomRange(0.8, 1.5) : randomRange(2, 4),
    });
  }

  return memories;
};

// Background music URL (Royalty free)
export const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3?filename=relaxing-music-vol1-124477.mp3";