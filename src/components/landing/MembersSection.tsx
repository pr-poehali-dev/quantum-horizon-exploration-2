import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const members = [
  {
    id: "alex",
    name: "Алекс",
    role: "Вокал, гитара",
    bio: "Голос и душа группы. Пишет большинство текстов и мелодий.",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: "maria",
    name: "Мария",
    role: "Клавишные, вокал",
    bio: "Создаёт атмосферные аранжировки и электронные текстуры.",
    gradient: "from-pink-600 to-purple-600",
  },
  {
    id: "dima",
    name: "Дима",
    role: "Ударные, перкуссия",
    bio: "Ритмическое сердце группы. Играет с безупречной точностью.",
    gradient: "from-orange-600 to-red-600",
  },
];

const MembersSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="members" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Участники группы</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Три музыканта — один звук. Познакомьтесь с теми, кто создаёт Resonance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 hover:scale-105 transition-all duration-300 flex flex-col items-center">
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                <p className="text-zinc-400 text-sm mb-6">{member.bio}</p>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate(`/member/${member.id}`)}
                >
                  Профиль →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
