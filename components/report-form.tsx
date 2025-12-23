"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ImageIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { MapWithMarker } from "./MapWithMarker"
import { ImageUploadButton } from "./ImageUploadButton"
import { useAuth } from "../hooks/useAuth"

const formSchema = z.object({
  setoresImpactados: z.string().min(1, "Selecione um setor"),
  tipoInconformidade: z.string().min(1, "Selecione o tipo de inconformidade"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  imagem: z.any().nullable(),
})

export function ReportForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [problematicas, setProblematicas] = useState([])
  const [coords, setCoords] = useState(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      setoresImpactados: "",
      tipoInconformidade: "",
      coords: null,
      descricao: "",
      imagem: null,
    },
  })

  function handleLocationChange(coords: google.maps.LatLngLiteral) {
    form.setValue("coords.lat", coords.lat)
    form.setValue("coords.lng", coords.lng)
  }

  const setorSelecionado = form.watch("setoresImpactados")

  useEffect(() => {
    if (!setorSelecionado) return;

    const fetchProblematicas = async () => {
      try {
    
        const res = await fetch(`http://20.63.25.230:3000/categories/${setorSelecionado}`)
        const data = await res.json()

        let problems = [];

        data[0].issueTypes.forEach(element => {
          let littleProblems = [];
          littleProblems.push(element.id);
          littleProblems.push(element.title);
          problems.push(littleProblems);
        });

        setProblematicas(problems)
      } catch (error) {
        console.error("Erro ao buscar problemas:", error);
      }
    }

    fetchProblematicas()
  }, [setorSelecionado])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let base64Image = ""

      if (selectedImage) {
        // Converte para base64
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(selectedImage)
          reader.onload = () => resolve(reader.result) // tira o prefixo "data:image/png;base64,"
          reader.onerror = (error) => reject(error)
        });
      }

      const res = await fetch("http://20.63.25.230:3000/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
          description: values.descricao,
          latitude: values.coords.lat,
          longitude: values.coords.lng,
          issueTypeId: values.tipoInconformidade,
          imageUrl: base64Image,
        })
      });

      alert("Problema enviado!");
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Map Section */}
        <Card className="flex min-h-32 items-center justify-center border-2 border-dashed">
          <MapWithMarker onLocationChange={handleLocationChange}/>
        </Card>
        <p className="text-xs text-gray-500">
          Coordenadas: {JSON.stringify(form.watch("coords"))}
        </p>
        {/* Setores Impactados - FIRST */}
        <FormField
          control={form.control}
          name="setoresImpactados"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Setores Impactados</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Espaços Públicos">Espaços Públicos</SelectItem>
                  <SelectItem value="Infraestrutura Urbana">Infraestrutura Urbana</SelectItem>
                  <SelectItem value="Mobilidade e Transporte">Mobilidade e Transporte</SelectItem>
                  <SelectItem value="Saneamento e Meio Ambiente">Saneamento e Meio Ambiente</SelectItem>
                  <SelectItem value="Segurança e Cidadania">Segurança e cidadania</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {problematicas.length > 0 && (
          <FormField
            control={form.control}
            name="tipoInconformidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problemáticas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a problemática" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {problematicas.map((p, i) => (
                      <SelectItem key={p[0]} value={p[0]}>
                        {p[1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}


        {/* Descrição */}
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea placeholder="Descreva a ocorrência..." className="min-h-32 resize-none pr-12" {...field} />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 h-8 w-8"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                        form.setValue("imagem", file); // se quiser guardar no form
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*}
        <pre className="text-xs text-red-500">
          {JSON.stringify(form.formState.errors, null, 2)}
        </pre>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="mt-2 h-14 text-base font-bold">
          Enviar Denúncia
        </Button>
      </form>
    </Form>
  )
}
