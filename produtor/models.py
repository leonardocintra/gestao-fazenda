from django.db import models


class Produtor(models.Model):
    nome = models.CharField(max_length=100, verbose_name='Nome do Produtor')
    endereco = models.CharField(
        max_length=60, blank=True, null=True, verbose_name='Endereço')
    cidade = models.CharField(
        max_length=60, blank=True, null=True, verbose_name='Cidade')
    uf = models.CharField(max_length=2, blank=True,
                          null=True, verbose_name='Estado')
    telefone = models.CharField(
        max_length=20, blank=True, null=True, verbose_name='Telefone')
    email = models.EmailField(verbose_name='E-mail', unique=True)
    email_confirmado = models.BooleanField(default=False)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Data de Criação')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='Última Atualização')

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Produtores'
        db_table = 'produtor'
